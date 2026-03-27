# Changelog

All notable changes to this project will be documented in this file.

## [1.2.0] - 2026-03-27

### Added

- PostgreSQL integration for persistent data storage
- Database configuration via `DATABASE_URL` environment variable
- SQL schema file (`backend/src/config/schema.sql`) for clients and invoices tables
- Database setup script (`npm run db:setup --workspace=backend`)
- `asyncHandler` middleware for clean async error handling in Express 4
- Separate test database support via `TEST_DATABASE_URL`
- Parameterized SQL queries for SQL injection prevention
- Graceful handling of invalid UUID format (returns 404 instead of 500)

### Changed

- All models now use PostgreSQL via `node-pg` pool (was in-memory arrays)
- All controllers converted to async/await
- All route handlers wrapped with `asyncHandler`
- Error handler hides internal error messages in production
- Tests now use a real PostgreSQL test database with proper setup/teardown
- Invoice test creates a client first, matching realistic usage
- Backend version bumped to 1.2.0

### Dependencies

- Added `pg` ^8.13.1

## [1.1.0] - 2026-03-27

### Security

- Restricted CORS to configured origins via `CORS_ORIGIN` environment variable
- Added request body size limit (100KB) to prevent payload-based DoS
- Fixed mass assignment vulnerability in invoice and client controllers by whitelisting allowed fields
- Added 404 handler for unknown API routes

### Added

- Server-side invoice total calculation from line items
- Invoice status enum validation (`draft`, `sent`, `paid`, `overdue`)
- Deep validation for invoice line items (`description`, `quantity`, `unitPrice`)
- Frontend: Invoice creation form with dynamic line items and real-time total
- Frontend: Client creation form with name, email, phone, address fields
- Frontend: Delete functionality for invoices and clients with confirmation dialog
- New test cases: mass assignment protection, status validation, item field validation, 404 routes
- API reference documentation in README
- Environment variable documentation in README
- This changelog

### Changed

- Updated `backend/.env.example` with `CORS_ORIGIN` variable
- Enhanced invoice route validation rules to cover item sub-fields
- Updated test suite to reset both Invoice and Client stores in `beforeEach`
- InvoiceList and ClientList components now accept optional `onDelete` prop

## [1.0.0] - 2025-12-27

### Added

- Initial release
- Express REST API with CRUD endpoints for invoices and clients
- React frontend with dashboard, invoice list, and client list pages
- Input validation via express-validator
- Basic API integration tests
- Monorepo setup with npm workspaces
