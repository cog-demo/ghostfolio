# FinServ Co — Internal Operations Portal

A lightweight internal operations portal for FinServ Co, a mid-size financial services company. This monorepo contains the ops-portal web application and supporting backend services.

## Architecture

```
finserv-co/
├── apps/
│   └── ops-portal/          # Next.js web application
├── services/
│   ├── export/              # CSV export service
│   ├── transactions/        # Transaction data layer
│   └── audit/               # Audit trail service
├── packages/
│   └── ui/                  # Shared UI component library
└── tools/                   # Internal developer utilities
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Starts the ops-portal at [http://localhost:3000](http://localhost:3000).

### Testing

```bash
# Run all service tests
npm test

# Run export service tests only
npm run test:services
```

### Linting

```bash
npm run lint
npm run format:check
```

## Services

### Export Service

Handles generation of CSV exports for transaction data. Supports filtering by customer and date range.

### Transaction Repository

Data access layer for transaction records. Provides query interfaces for the ops-portal and export service.

### Audit Service

Tracks operations performed by users for compliance and debugging.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development workflow and conventions.
