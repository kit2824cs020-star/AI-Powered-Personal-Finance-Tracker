# API endpoints

Base URL: `http://localhost:8080/api`

| Method | Path | Auth | Purpose |
|---|---|---:|---|
| POST | `/auth/register` | No | Register account |
| POST | `/auth/login` | No | Login and receive JWT |
| GET | `/me` | Yes | Current profile |
| GET/POST | `/transactions` | Yes | List/create transactions |
| PUT/DELETE | `/transactions/{id}` | Yes | Update/delete owned transaction |
| GET/POST | `/budgets` | Yes | List/create budgets |
| PUT/DELETE | `/budgets/{id}` | Yes | Update/delete owned budget |
| GET/POST | `/goals` | Yes | List/create savings goals |
| PUT/DELETE | `/goals/{id}` | Yes | Update/delete owned goal |
| GET/POST | `/recurring` | Yes | List/create recurring templates |
| PUT/DELETE | `/recurring/{id}` | Yes | Update/delete recurring template |
| GET | `/reports/summary?month=YYYY-MM` | Yes | Monthly totals/category expense |
| POST | `/ai/categorize` | Yes | Rule-based category suggestion |
| POST | `/ai/forecast` | Yes | Expense trend baseline |
| POST | `/ai/anomalies` | Yes | IQR anomaly candidates |
| POST | `/ai/budget-recommendations` | Yes | Historical spending-based budget suggestions |
| POST | `/ai/assistant` | Yes | Context-aware safe assistant |
| POST | `/ai/receipt` | Yes | Receipt OCR extraction candidates |

Interactive API docs: `http://localhost:8080/swagger-ui.html`.
