# FinServ Co — Linear Backlog Items

Issues and feature requests for populating the Linear board. Each item includes a title, type (Bug / Feature / Improvement / Chore), and a brief description.

---

## Bugs

### 1. CSV export times out for enterprise customers
**Type:** Bug | **Priority:** Critical
Export CSV for Acme Capital fails with "Request timed out" error. The export service loads all 500k+ records into memory before generating output, causing OOM/timeout for large datasets. Needs streaming implementation.

### 2. Transaction table pagination missing
**Type:** Bug | **Priority:** High
The transactions page loads all records at once with no pagination. For customers with large histories this causes slow initial page load and browser jank.

### 3. Search filter does not reset when navigating away
**Type:** Bug | **Priority:** Medium
If a user enters a search query on the Transactions page, navigates to Dashboard, and returns, the filter state persists but the input field appears empty.

### 4. Metric cards show stale data after midnight
**Type:** Bug | **Priority:** Medium
Dashboard metric cards (Transactions Today, etc.) do not refresh automatically. After midnight the "Today" count continues showing yesterday's totals until a hard refresh.

### 5. Export dialog does not close on backdrop click
**Type:** Bug | **Priority:** Low
Clicking outside the export dialog modal does not dismiss it. Users must click the explicit "Close" button.

---

## Features

### 6. Add date range filter to transactions
**Type:** Feature | **Priority:** High
Allow users to filter the transaction table by start and end date. Should integrate with the existing search toolbar.

### 7. Real-time transaction status updates via WebSocket
**Type:** Feature | **Priority:** Medium
Transactions in "processing" status should update in real-time when they transition to "completed" or "failed" without requiring a page refresh.

### 8. Scheduled export automation
**Type:** Feature | **Priority:** Medium
Allow ops users to configure recurring CSV exports (daily, weekly) that are automatically delivered to a configured S3 bucket or email address.

### 9. Add role-based access control (RBAC)
**Type:** Feature | **Priority:** High
Implement user roles (viewer, analyst, admin) with appropriate page/action restrictions. Admin required for export operations on enterprise accounts.

### 10. Audit trail page in ops-portal
**Type:** Feature | **Priority:** Medium
Add a dedicated page showing audit log entries. Should support filtering by user, action type, and date range.

### 11. Transaction detail view / side panel
**Type:** Feature | **Priority:** Medium
Clicking a transaction row should open a detail panel showing full metadata, related transactions, and audit history.

### 12. Multi-customer export support
**Type:** Feature | **Priority:** Low
Allow selecting multiple customers in the export dialog and generating a combined CSV or zip of individual CSVs.

### 13. Add JSON export format option
**Type:** Feature | **Priority:** Low
In addition to CSV, support exporting transactions as JSON for API integrations and downstream processing.

### 14. Implement global search (Cmd+K)
**Type:** Feature | **Priority:** Medium
Add a command palette for quickly navigating to transactions, customers, or settings from anywhere in the app.

### 15. Email notifications for failed exports
**Type:** Feature | **Priority:** Medium
When an export fails, send an email notification to the requesting user with error details and a retry link.

### 16. Dark mode support
**Type:** Feature | **Priority:** Low
Add a dark mode toggle in settings. Should respect system preference by default.

---

## Improvements

### 17. Migrate export service to streaming architecture
**Type:** Improvement | **Priority:** Critical
Refactor `exportService.ts` to use a streaming/chunked approach instead of loading all records into memory. This will resolve the timeout bug for large customers and reduce memory pressure.

### 18. Add request tracing / correlation IDs
**Type:** Improvement | **Priority:** High
Implement distributed tracing across services. Each API request should carry a correlation ID that flows through transaction repository, export service, and audit logger.

### 19. Replace in-memory data with PostgreSQL
**Type:** Improvement | **Priority:** High
Migrate the transaction repository from in-memory generated data to a real PostgreSQL database with Prisma ORM. Requires coordination with the infra team for provisioning.

### 20. Add structured logging across services
**Type:** Improvement | **Priority:** Medium
Replace console.log statements with a structured logging library (e.g., pino). Include service name, request ID, and duration in all log entries.

### 21. Improve error handling in export service
**Type:** Improvement | **Priority:** Medium
Add specific error types (TimeoutError, DataAccessError, ValidationError) instead of generic error strings. Include retry guidance in error responses.

### 22. Add integration tests for the export pipeline
**Type:** Improvement | **Priority:** Medium
Create end-to-end tests that exercise the full path: API route → export service → transaction repository → CSV generation. Current tests only cover unit-level behavior.

### 23. Optimize transaction data generator for test performance
**Type:** Improvement | **Priority:** Low
The `generateTransactions` function for Acme Capital creates 500k records synchronously. Consider lazy generation or a pre-computed fixture for faster test execution.

### 24. Add OpenAPI spec for internal APIs
**Type:** Improvement | **Priority:** Medium
Document the export and transaction APIs with an OpenAPI 3.0 specification. Auto-generate TypeScript client types from the spec.

---

## Chores

### 25. Set up CI/CD pipeline
**Type:** Chore | **Priority:** High
Configure GitHub Actions for lint, typecheck, test, and build on every PR. Add deployment workflow for staging environment.

### 26. Add Husky pre-commit hooks
**Type:** Chore | **Priority:** Medium
Set up pre-commit hooks to run lint and format checks before allowing commits. Prevent CI failures from formatting issues.

### 27. Configure Dependabot for dependency updates
**Type:** Chore | **Priority:** Low
Enable automated dependency update PRs for security patches and minor version bumps.

### 28. Add code coverage reporting
**Type:** Chore | **Priority:** Medium
Integrate Jest coverage reporting with CI. Set minimum coverage thresholds for the services directory (80% line coverage).

### 29. Create developer onboarding documentation
**Type:** Chore | **Priority:** Medium
Write comprehensive setup guide covering local development, testing, architecture decisions, and deployment procedures.

### 30. Consolidate duplicate utility functions
**Type:** Chore | **Priority:** Low
`formatDisplayDate` exists in both `services/transactions/utils/dateUtils.ts` and `apps/ops-portal/src/lib/formatters.ts`. Extract to a shared package.
