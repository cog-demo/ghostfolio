---
name: testing-finserv-co
description: Test the FinServ Co ops-portal end-to-end. Use when verifying UI, export CSV, or transaction page changes.
---

# Testing FinServ Co Ops-Portal

## Prerequisites

- Node.js 20.x
- Run `npm install` at the repo root (workspaces will install all deps)

## Start Dev Server

```bash
cd /home/ubuntu/ghostfolio
npm run dev
# Runs on http://localhost:3000
```

## Key Test Flows

### 1. Dashboard
- Navigate to `http://localhost:3000`
- Verify 4 metric cards: Transactions Today (12,847), Pending Reviews (23), Failed Exports (3), Active Alerts (7)
- Verify sidebar shows "FinServ Co" branding, nav items (Dashboard, Transactions, Reports, Settings), and user "Jane Doe"

### 2. Transactions Page
- Click "Transactions" in sidebar → `/transactions`
- Verify table shows 12 rows with columns: Transaction ID, Customer, Amount, Status, Timestamp
- Verify search input filters rows by customer name or transaction ID
- Verify "Export CSV" button opens the export dialog

### 3. Export CSV — Small Customer (Happy Path)
- Click "Export CSV" → modal opens with customer dropdown
- Select a small customer (e.g., "Oakwood Ventures" — 45 records)
- Click "Export CSV" in dialog
- Expected: blue "Generating export..." briefly, then green "Download started" within ~5 seconds

### 4. Export CSV — Acme Capital (Planted Bug)
- Select "Acme Capital" from the dropdown (500k records in the service layer)
- Click "Export CSV"
- Expected per spec: "Export failed: Request timed out" after ~30 seconds
- **Known issue (as of initial implementation):** The 500k-record in-memory string concatenation may complete within the 30-second timeout on fast machines, showing "Download started" instead. If this happens, the timeout threshold (`EXPORT_TIMEOUT_MS` in `services/export/exportService.ts`) or the simulated I/O delay needs to be tuned.

### 5. Search Filter
- Type a customer name (e.g., "Acme") in the search input
- Verify only matching rows appear
- Clear the search → all 12 rows should return

## Key Files

| File | Purpose |
|---|---|
| `apps/ops-portal/src/app/page.tsx` | Dashboard page |
| `apps/ops-portal/src/app/transactions/page.tsx` | Transactions page |
| `apps/ops-portal/src/components/ExportDialog.tsx` | Export modal (client component) |
| `apps/ops-portal/src/app/api/export/route.ts` | API route calling exportService |
| `services/export/exportService.ts` | Planted bug location (in-memory CSV gen) |
| `services/export/exportService.test.ts` | Unit tests for export service |
| `services/transactions/dataGenerator.ts` | Synthetic data generation (customer sizes) |

## Running Unit Tests

```bash
npm run test:services -- --forceExit
```

This runs the Jest test suite for services (6 tests covering small/medium/large exports and edge cases).

## Useful Commands

```bash
npm run lint      # ESLint
npm run build     # Next.js production build
npm run typecheck # TypeScript type checking (if configured)
npm run format    # Prettier formatting
```

## Customer Dropdown Values

Derived from `apps/ops-portal/src/lib/data.ts` unique customers:
- Meridian Holdings
- Acme Capital
- Pinnacle Finance
- Oakwood Ventures
- Summit Group

## Devin Secrets Needed

No secrets are required for local testing. The app uses no real authentication, database, or external APIs.
