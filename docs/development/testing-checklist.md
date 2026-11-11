# End-to-end verification checklist

Do not enter real financial data until the checks below pass and secrets are configured.

## A. Build checks
- [ ] `cd frontend; npm install; npm run build`
- [ ] `cd backend; mvn clean test package`
- [ ] `cd ai-service; pip install -r requirements-dev.txt; python -m pytest -q`
- [ ] `docker compose config` (if Docker is installed)

## B. Local service checks
- [ ] MongoDB is reachable from the backend.
- [ ] `GET http://localhost:8080/actuator/health` returns `{"status":"UP"...}`.
- [ ] `GET http://localhost:8000/health` returns `UP`.
- [ ] Frontend opens at `http://localhost:5173`.

## C. Authentication and isolation
1. Register User A at `POST /api/auth/register` with `{ "name":"Test User A", "email":"a@example.test", "password":"StrongPass123" }`.
2. Save the returned token as `TOKEN_A`.
3. Register User B with a different email and save `TOKEN_B`.
4. Use `Authorization: Bearer TOKEN_A` to create a transaction.
5. Confirm User A can list it and User B cannot see it.
6. Confirm unauthenticated requests to `/api/transactions` return 401.
7. Confirm duplicate email returns 409 and wrong password returns 401.

## D. Finance CRUD
- [ ] Create, list, update and delete an income transaction.
- [ ] Create, list, update and delete an expense transaction.
- [ ] Verify amount is stored/displayed in rupees but persisted as integer paise.
- [ ] Create a budget and verify monthly report category totals.
- [ ] Create a goal and verify saved/target progress.
- [ ] Create a recurring template with a due date in a disposable test database; verify scheduler posts one occurrence and advances nextDate. Never test duplicate posting against live data.
- [ ] Verify monthly and yearly reports against manually calculated sample transactions.
- [ ] Export monthly CSV and inspect commas, quotes, and amounts.

## E. AI service
- [ ] Categorization returns a suggestion and the UI requires user confirmation.
- [ ] Forecast returns the requested horizon and clearly identifies the linear-trend baseline.
- [ ] IQR anomaly detection flags a known synthetic outlier.
- [ ] Assistant returns safe guidance without a Gemini key; with a key, verify provider response and fallback.
- [ ] Receipt OCR accepts JPG/PNG/WEBP only, rejects unsupported files, and never auto-creates a transaction.
- [ ] Test oversized files and unreadable receipts.

## F. Security / failure cases
- [ ] User A cannot read, edit or delete User B's records by guessing IDs.
- [ ] Expired/invalid JWT is rejected.
- [ ] CORS allows only the configured frontend origin.
- [ ] `.env`, MongoDB URI, JWT secret and provider keys are absent from Git.
- [ ] Stop the AI service and confirm finance CRUD remains available; AI pages show a recoverable error.
- [ ] Test backup/restore before any production use.

## Known boundaries
The daily recurring scheduler runs in the backend process and uses the server timezone. For multi-instance production deployment, move recurring processing to a distributed job/queue with a database-level unique idempotency constraint. The current IQR/linear-trend/rule-categorization methods are explainable baselines, not validated financial prediction models. OCR requires a separately installed Tesseract executable.
