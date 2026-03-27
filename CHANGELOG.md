# Changelog

All notable changes to this project will be documented in this file.

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

### Known Limitations

- Data is stored in-memory only (lost on server restart)
- No authentication / authorization layer
- Frontend displays raw client IDs instead of client names in invoice list

## [1.0.0] - 2025-12-27

### Added

- Initial release
- Express REST API with CRUD endpoints for invoices and clients
- React frontend with dashboard, invoice list, and client list pages
- Input validation via express-validator
- Basic API integration tests
- Monorepo setup with npm workspaces
