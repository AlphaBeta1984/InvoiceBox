# InvoiceBox

A full-stack invoice management application built with Node.js/Express (backend) and React (frontend).

## Project Structure

```
InvoiceBox/
├── backend/                 # Express REST API
│   └── src/
│       ├── controllers/     # Route handler logic
│       ├── middleware/      # Error handling, validation
│       ├── models/          # Data models (Invoice, Client)
│       ├── routes/          # Express route definitions
│       └── __tests__/       # API integration tests
└── frontend/                # React single-page application
    └── src/
        ├── components/      # Reusable UI components
        ├── pages/           # Full-page views
        └── services/        # API client functions
```

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9

### Install dependencies

```bash
npm install
```

### Configure environment

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

### Run in development mode

```bash
npm run dev
```

The API will be available at `http://localhost:3001` and the frontend at `http://localhost:3000`.

### Run tests

```bash
npm test
```

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
  "clientId": "uuid",
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
- Dashboard with summary statistics
- Generate invoice PDFs (planned)

## Security

- CORS restricted to configured origins
- Request body size limited to 100KB
- Field-level whitelisting prevents mass assignment attacks
- Input validation via express-validator

> **Note:** This application does not yet include authentication. Do not expose to the public internet without adding an auth layer.
