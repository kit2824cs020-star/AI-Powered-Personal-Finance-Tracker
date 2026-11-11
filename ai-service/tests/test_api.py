from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health():
    response = client.get('/health')
    assert response.status_code == 200
    assert response.json()['status'] == 'UP'

def test_rule_categorization():
    response = client.post('/categorize', json={'description': 'Swiggy dinner order'})
    assert response.status_code == 200
    assert response.json()['category'] == 'food'

def test_forecast_returns_requested_horizon():
    response = client.post('/forecast', json={'monthly_expenses': [1000, 1200, 1400], 'horizon': 3})
    assert response.status_code == 200
    assert len(response.json()['predictions']) == 3

def test_iqr_anomaly_detection():
    transactions = [
        {'amount': 100, 'description': 'small one'},
        {'amount': 110, 'description': 'small two'},
        {'amount': 90, 'description': 'small three'},
        {'amount': 10000, 'description': 'large unusual payment'},
    ]
    response = client.post('/anomalies', json={'transactions': transactions})
    assert response.status_code == 200
    assert response.json()['anomalies'][0]['description'] == 'large unusual payment'

def test_assistant_fallback_without_api_key(monkeypatch):
    monkeypatch.delenv('GEMINI_API_KEY', raising=False)
    response = client.post('/assistant', json={'question': 'How can I save?', 'summary': {}})
    assert response.status_code == 200
    assert response.json()['provider'] == 'local_safe_rules'

def test_budget_recommendations_need_history():
    response = client.post('/budget-recommendations', json={
        'category_expenses': {'food': [1000, 1200, 1100], 'rent': [10000]}
    })
    assert response.status_code == 200
    assert len(response.json()['suggestions']) == 1
    assert response.json()['suggestions'][0]['category'] == 'food'
