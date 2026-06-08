# Contributing to FinServ Co

## Development Workflow

1. Create a feature branch from `main`
2. Make your changes
3. Run tests: `npm test`
4. Run lint: `npm run lint`
5. Open a pull request

## Code Style

- TypeScript strict mode is enabled
- Use Prettier for formatting (runs automatically via pre-commit hook)
- Follow existing patterns in the codebase

## Testing

All service-layer code should have corresponding tests in a `.test.ts` file adjacent to the source.

## Architecture Decisions

- **Services** contain business logic and data access
- **Packages** contain shared utilities and UI components
- **Apps** consume services and packages to deliver user-facing features
- Keep services independent — avoid circular dependencies between services

## Commit Messages

Use conventional commits:

```
feat: add transaction filtering
fix: resolve export timeout for large datasets
chore: update dependencies
```
