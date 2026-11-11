from fastapi import FastAPI, UploadFile, File, HTTPException
from pydantic import BaseModel, Field
from typing import List, Optional
from collections import defaultdict
from statistics import mean, pstdev
from datetime import date
import os, re, io, json
import httpx

app = FastAPI(title="Finance AI Service", version="1.0.0", description="Forecasting, categorization, anomaly detection and finance assistant")

class Tx(BaseModel):
    amount: float = Field(gt=0)
    description: str = ""
    category: Optional[str] = None
    date: Optional[str] = None
class ForecastRequest(BaseModel):
    monthly_expenses: List[float] = Field(min_length=2)
    horizon: int = Field(default=3, ge=1, le=12)
class AnomalyRequest(BaseModel):
    transactions: List[Tx]
class AssistantRequest(BaseModel):
    question: str
    summary: dict = {}
class BudgetRecommendationRequest(BaseModel):
    category_expenses: dict[str, List[float]]

@app.get("/health")
def health(): return {"status":"UP","service":"finance-ai-service"}

@app.post("/categorize")
def categorize(payload: dict):
    text = (str(payload.get("description", "")) + " " + str(payload.get("merchant", ""))).lower()
    rules = {
      "food": ["swiggy","zomato","restaurant","grocery","food","cafe","hotel"],
      "transport": ["uber","ola","metro","fuel","petrol","bus","train","flight"],
      "utilities": ["electricity","water bill","internet","recharge","gas bill"],
      "shopping": ["amazon","flipkart","myntra","shopping","store"],
      "health": ["hospital","pharmacy","medical","doctor","clinic"],
      "entertainment": ["netflix","spotify","movie","cinema","game"],
      "education": ["course","udemy","book","tuition","college"],
      "rent": ["rent","lease","housing"],
      "salary": ["salary","payroll"],
      "freelance": ["freelance","client payment","invoice"]
    }
    for category, words in rules.items():
        if any(word in text for word in words): return {"category":category,"confidence":0.82,"method":"keyword_rules"}
    return {"category":"other","confidence":0.35,"method":"fallback","requiresConfirmation":True}

@app.post("/forecast")
def forecast(req: ForecastRequest):
    values = req.monthly_expenses
    # Transparent baseline: least-squares linear trend, not a trained ML model.
    n=len(values); x=list(range(n)); xm=mean(x); ym=mean(values)
    denom=sum((v-xm)**2 for v in x)
    slope=sum((x[i]-xm)*(values[i]-ym) for i in range(n))/denom if denom else 0
    intercept=ym-slope*xm
    predictions=[max(0.0, round(intercept+slope*(n+i),2)) for i in range(req.horizon)]
    return {"method":"linear_trend_baseline","historicalMonths":n,"predictions":predictions,"currency":"INR","disclaimer":"Baseline estimate from supplied monthly totals; not financial advice."}

@app.post("/budget-recommendations")
def budget_recommendations(req: BudgetRecommendationRequest):
    suggestions=[]
    for category, monthly_values in req.category_expenses.items():
        clean=[max(0.0,float(v)) for v in monthly_values]
        if len(clean)<2: continue
        average=sum(clean)/len(clean)
        # Small buffer above historical average; user must approve the suggested limit.
        recommended=round((average*1.10)/100)*100
        suggestions.append({"category":category,"historicalAverage":round(average,2),"suggestedMonthlyLimit":max(100.0,recommended),"monthsUsed":len(clean),"confidence":"low" if len(clean)<4 else "moderate"})
    return {"method":"historical_average_plus_10_percent","suggestions":suggestions,"disclaimer":"Suggestions are based on supplied history. Review and edit each budget; no budget is changed automatically."}

@app.post("/anomalies")
def anomalies(req: AnomalyRequest):
    amounts=[t.amount for t in req.transactions]
    if len(amounts)<4: return {"method":"iqr_baseline","anomalies":[],"message":"At least four transactions are required."}
    q1=float(__import__("numpy").percentile(amounts,25))
    q3=float(__import__("numpy").percentile(amounts,75))
    spread=q3-q1
    lower=q1-1.5*spread; upper=q3+1.5*spread
    out=[]
    for t in req.transactions:
        if t.amount<lower or t.amount>upper:
            out.append({"description":t.description,"amount":t.amount,"category":t.category,"reason":"Amount falls outside the interquartile-range fence for this sample."})
    return {"method":"iqr_baseline","anomalies":out,"lowerFence":round(lower,2),"upperFence":round(upper,2)}

@app.post("/assistant")
async def assistant(req: AssistantRequest):
    q=req.question.lower(); s=req.summary or {}
    if any(k in q for k in ["save","saving","reduce","cut"]):
        answer="Start by reviewing your highest spending categories, setting a realistic category budget, and tracking weekly progress. I can only use the summary supplied to me; verify all amounts in your transaction records."
    elif any(k in q for k in ["budget","overspend"]):
        answer="Compare month-to-date spending with each category budget. Prioritize essential bills, then adjust discretionary categories. This assistant does not move money or change budgets automatically."
    elif any(k in q for k in ["balance","income","expense","spend"]):
        answer=f"Based on the verified summary provided: income ₹{s.get('income', 'not supplied')}, expenses ₹{s.get('expense', 'not supplied')}, balance ₹{s.get('balance', 'not supplied')}. These figures are only as current as the backend summary."
    else:
        answer="I can help explain your spending, compare budgets, and suggest practical saving habits. Ask about a category, your monthly summary, or ways to reduce discretionary spending."
    api_key = os.getenv("GEMINI_API_KEY")
    if api_key:
        model = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")
        prompt = ("You are a cautious personal-finance education assistant. Use only the supplied summary; "
                  "never invent amounts, claim bank access, or make investment/tax/legal recommendations. "
                  "If data is missing, say so. Give practical, non-coercive budgeting education. "
                  "User question: " + req.question + "\nVerified backend summary JSON: " + json.dumps(s))
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent"
        try:
            async with httpx.AsyncClient(timeout=20) as client:
                response = await client.post(url, params={"key": api_key}, json={"contents":[{"parts":[{"text":prompt}]}],"generationConfig":{"temperature":0.2,"maxOutputTokens":500}})
                response.raise_for_status()
                payload = response.json()
                text = payload["candidates"][0]["content"]["parts"][0]["text"]
                return {"answer":text,"provider":"gemini_api","model":model,"disclaimer":"Informational support only; not investment, tax, or legal advice."}
        except Exception:
            # Keep the service useful if the optional provider is unavailable; never expose provider secrets/errors.
            pass
    return {"answer":answer,"provider":"local_safe_rules","disclaimer":"Informational support only; not investment, tax, or legal advice."}

@app.post("/receipt")
async def receipt(file: UploadFile = File(...)):
    if file.content_type not in {"image/jpeg","image/png","image/webp"}:
        raise HTTPException(415,"Upload a JPG, PNG, or WEBP receipt image.")
    raw=await file.read()
    if len(raw)>8*1024*1024: raise HTTPException(413,"Receipt must be smaller than 8 MB.")
    try:
        from PIL import Image
        import pytesseract
        image=Image.open(io.BytesIO(raw))
        text=pytesseract.image_to_string(image)
        amounts=re.findall(r"(?:₹|INR\s*)?([0-9]{1,6}(?:,[0-9]{3})*(?:\.[0-9]{1,2})?)",text)
        return {"text":text[:5000],"candidateAmounts":[a.replace(',','') for a in amounts[-5:]],"requiresConfirmation":True,"status":"extracted"}
    except Exception as exc:
        return {"status":"ocr_unavailable","message":"Install the Tesseract OCR engine and configure its executable path to enable OCR.","requiresConfirmation":True}
