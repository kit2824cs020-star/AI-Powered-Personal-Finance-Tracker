# Build verification status

Last checked: 2026-11-10

## Checks actually run in the build workspace
- PASS: Python syntax compilation for FastAPI service and tests.
- PASS: 6 FastAPI endpoint tests (health, categorization, forecast, IQR anomaly detection, assistant fallback, budget suggestions).
- PASS: receipt upload rejects an unsupported PDF with HTTP 415.
- PASS: JavaScript/JSX syntax transpilation for every frontend `.js` and `.jsx` source file.
- PASS: all relative frontend imports resolve.
- PASS: `package.json`, `package-lock.json`, Postman collection JSON, Maven `pom.xml`, and Docker Compose YAML parse.

## Not run
- Frontend production build: dependency installation in the isolated build workspace timed out, so Vite was unavailable.
- Spring Boot Maven build and JUnit smoke tests: Maven is not installed in the build workspace.
- Docker image/Compose build: Docker is not installed in the build workspace.
- Full browser + MongoDB integration tests: require the user's MongoDB URI and local runtime.

Do not interpret the source-level checks as a completed end-to-end runtime certification. Follow `testing-checklist.md` on the target Windows machine before using real data.
