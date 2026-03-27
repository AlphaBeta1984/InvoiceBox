# InvoiceBox

A full-stack invoice management application built with Node.js/Express (backend), React (frontend), and PostgreSQL.

## Project Structure

```
InvoiceBox/
├── backend/                 # Express REST API
│   └── src/
│       ├── config/          # Database pool and schema
│       ├── controllers/     # Route handler logic
│       ├── middleware/      # Error handling, validation, asyncHandler
│       ├── models/          # Data models (Invoice, Client) — PostgreSQL
│       ├── routes/          # Express route definitions
│       └── __tests__/       # API integration tests
└── frontend/                # React single-page application
    └── src/
        ├── components/      # Reusable UI components (lists + forms)
        ├── pages/           # Full-page views
        └── services/        # API client functions
```

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9
- PostgreSQL >= 13

### 1. Create the databases

```bash
createdb invoicebox
createdb invoicebox_test   # for running tests
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

Copy the example env file and adjust as needed:

```bash
cp backend/.env.example backend/.env
```

Available environment variables:

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3001` | Backend server port |
| `NODE_ENV` | `development` | Environment mode |
| `CORS_ORIGIN` | `http://localhost:3000` | Allowed CORS origin(s), comma-separated |
| `DATABASE_URL` | `postgresql://localhost:5432/invoicebox` | PostgreSQL connection string |

### 4. Initialize the database schema

```bash
npm run db:setup --workspace=backend
```

### 5. Run in development mode

```bash
npm run dev
```

The API will be available at `http://localhost:3001` and the frontend at `http://localhost:3000`.

### 6. Run tests

Make sure the `invoicebox_test` database exists, then:

```bash
npm test
```

Tests use `TEST_DATABASE_URL` (defaults to `postgresql://localhost:5432/invoicebox_test`).

## API Reference

### Health Check

```
GET /health
→ { "status": "ok" }
```

### Invoices

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/invoices` | List all invoices |
| `GET` | `/api/invoices/:id` | Get invoice by ID |
| `POST` | `/api/invoices` | Create a new invoice |
| `PUT` | `/api/invoices/:id` | Update an invoice |
| `DELETE` | `/api/invoices/:id` | Delete an invoice |

**Create / Update Invoice body:**

```json
{
  "clientId": "uuid-or-string",
  "invoiceNumber": "INV-001",
  "issueDate": "2024-01-01",
  "dueDate": "2024-01-31",
  "status": "draft",
  "items": [
    { "description": "Service", "quantity": 1, "unitPrice": 100 }
  ]
}
```

> `total` is calculated server-side from items. `status` must be one of: `draft`, `sent`, `paid`, `overdue`.

### Clients

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/clients` | List all clients |
| `GET` | `/api/clients/:id` | Get client by ID |
| `POST` | `/api/clients` | Create a new client |
| `PUT` | `/api/clients/:id` | Update a client |
| `DELETE` | `/api/clients/:id` | Delete a client |

**Create / Update Client body:**

```json
{
  "name": "Acme Corp",
  "email": "acme@example.com",
  "phone": "+1234567890",
  "address": "123 Main St"
}
```

## Features

- Create, read, update and delete invoices
- Manage client records
- Mark invoices as draft / sent / paid / overdue
- Server-side total calculation for invoices
- Input validation on both API and frontend
- PostgreSQL for persistent data storage
- Dashboard with summary statistics
- Generate invoice PDFs (planned)

## Security

- CORS restricted to configured origins
- Request body size limited to 100KB
- Field-level whitelisting prevents mass assignment attacks
- Input validation via express-validator
- Parameterized SQL queries prevent SQL injection
- Error messages hidden in production mode

> **Note:** This application does not yet include authentication. Do not expose to the public internet without adding an auth layer.
