# InvoiceBox

A full-stack invoice management application built with Node.js/Express (backend) and React (frontend).

## Project Structure

```
InvoiceBox/
├── backend/                 # Express REST API
│   └── src/
│       ├── config/          # Database and app configuration
│       ├── controllers/     # Route handler logic
│       ├── middleware/      # Auth, error handling, validation
│       ├── models/          # Data models (Invoice, Client)
│       └── routes/          # Express route definitions
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

### Run in development mode

```bash
npm run dev
```

The API will be available at `http://localhost:3001` and the frontend at `http://localhost:3000`.

### Run tests

```bash
npm test
```

## Features

- Create, read, update and delete invoices
- Manage client records
- Mark invoices as paid / unpaid / overdue
- Generate invoice PDFs (planned)
- Dashboard with summary statistics