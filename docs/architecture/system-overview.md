# System architecture

```mermaid
flowchart TD
  U[Browser] --> FE[React + Vite]
  FE -->|JWT REST| BE[Spring Boot API]
  BE --> DB[(MongoDB Atlas)]
  BE -->|Internal HTTP| AI[FastAPI AI service]
  AI --> OCR[Receipt OCR adapter]
  AI --> ML[Forecast / anomaly / categorization]
  AI --> LLM[Optional LLM provider adapter]
```

## Trust boundaries
- The browser never connects directly to MongoDB.
- Every finance API requires a bearer JWT; records are queried by authenticated user ID.
- Passwords are stored as BCrypt hashes. The API never returns password hashes.
- Money is stored as integer paise to avoid floating-point currency errors.
- AI output is advisory. OCR candidates must be reviewed by the user before being saved as a transaction.
- The AI service is private to the backend in deployment; do not expose credentials in frontend code.

## Collections
`users`, `transactions`, `budgets`, `financialGoals`, `recurringTransactions`. Future `aiInsights` records should include source transaction IDs and model/version metadata.
