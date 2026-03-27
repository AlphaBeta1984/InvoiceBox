const express = require('express');
const cors = require('cors');
const invoiceRoutes = require('./routes/invoices');
const clientRoutes = require('./routes/clients');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Security: restrict CORS to allowed origins
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:3000').split(',');
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}));

// Security: limit request body size
app.use(express.json({ limit: '100kb' }));

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.use('/api/invoices', invoiceRoutes);
app.use('/api/clients', clientRoutes);

// 404 handler for unknown routes
app.use((_req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use(errorHandler);

module.exports = app;
