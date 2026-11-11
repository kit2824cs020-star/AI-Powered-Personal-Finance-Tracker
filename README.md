# AI-Powered Personal Finance Tracking System

A full-stack personal finance application built with React, Java Spring Boot, MongoDB and a Python FastAPI service. The application is designed to run without an external LLM key; the assistant currently uses a transparent safe-rules baseline. AI capabilities are advisory and should never invent or silently save financial amounts.

## Stack
- Frontend: React, Vite, JavaScript, Tailwind CSS v4, React Router, Recharts, Lucide
- Backend: Java 21, Spring Boot 3.5, Spring Security, BCrypt, JWT, Maven, Spring Data MongoDB
- Database: MongoDB Atlas (or local MongoDB for development)
- AI service: Python 3.12+, FastAPI, NumPy, optional Tesseract OCR engine
- Quality/deployment: Postman, Swagger UI, Docker Compose, Git

## Project structure
```text
AI-Personal-Finance-Tracker/
├── frontend/                 # React application
├── backend/                  # Spring Boot REST API
├── ai-service/               # FastAPI ML/AI service
├── docs/                     # Architecture, API, database docs
├── .env.example
├── .gitignore
├── docker-compose.yml
└── README.md
```

## Features included in this baseline
- Registration/login with BCrypt password hashing and JWT-protected APIs
- User-scoped income/expense CRUD; amounts stored as integer paise
- Monthly category budgets and savings goals
- Recurring transaction templates with a daily scheduler and occurrence deduplication
- Monthly summary and CSV export
- Rule-based expense categorization suggestion
- Linear trend expense forecast baseline (not a trained forecasting model)
- IQR unusual-spending candidates
- Receipt OCR endpoint using Tesseract when the engine is installed; extracted amounts require human confirmation
- Context-aware assistant using backend summary and safe local rules; no LLM provider configured by default
- Dockerfiles and Compose setup

## Local development

### 1. Prerequisites
- Java 21 and Maven 3.9+
- Node.js 22+
- Python 3.12+
- MongoDB Atlas URI or local MongoDB

### 2. Backend
```powershell
cd backend
$env:MONGODB_URI="mongodb+srv://<username>:<password>@<cluster>/<database>?retryWrites=true&w=majority"
$env:JWT_SECRET="replace-this-with-a-random-secret-at-least-32-characters"
$env:CORS_ORIGIN="http://localhost:5173"
$env:AI_SERVICE_URL="http://localhost:8000"
mvn spring-boot:run
```
API: `http://localhost:8080`; Swagger: `http://localhost:8080/swagger-ui.html`.

### 3. AI service
```powershell
cd ai-service
py -3.12 -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
Health: `http://localhost:8000/health`; docs: `http://localhost:8000/docs`.

### 4. Frontend
```powershell
cd frontend
npm install
npm run dev
```
Frontend: `http://localhost:5173`. Optional `.env` can set `VITE_API_BASE_URL=http://localhost:8080/api`.

### 5. Docker Compose
Copy `.env.example` to `.env`, set a strong `JWT_SECRET`, keep the Docker MongoDB URI for local testing or replace it with your Atlas URI, then run:
```powershell
docker compose up --build
```
Frontend: `http://localhost:3000`; backend: `http://localhost:8080`; AI: `http://localhost:8000`. Compose defaults to a local MongoDB container. To use Atlas, set `MONGODB_URI` in `.env` and ensure Atlas network access permits your deployment host.

## Security notes before production
- Replace all development secrets; never commit `.env`.
- Configure HTTPS, strict CORS, rate limiting, email verification, password reset, and secure HttpOnly/SameSite cookies (the current frontend keeps JWT in sessionStorage for this development baseline).
- Add request size/rate limits, audit logging, backups, retention controls, and dependency scanning.
- Restrict AI-service network access to the backend. OCR text is untrusted input; review all extracted fields.
- Add tests for user isolation, auth expiry, CRUD validation, and AI-service failure modes before deployment.

## Current limitations to verify/extend
This is an integrated implementation baseline, not a claim of production certification. Recurring items are templates and are not automatically posted on a schedule. Forecasting is a linear trend baseline; anomaly detection is a z-score baseline; categorization is keyword rules. OCR requires the external Tesseract executable. The assistant uses local safe rules by default. If `GEMINI_API_KEY` is configured for the AI service, it can call the configurable Gemini model; only a backend-generated monthly summary is sent, and the local rules remain the fallback. Complete provider privacy review and prompt-safety tests before production. Run the complete build and integration test checklist before using real financial records.
