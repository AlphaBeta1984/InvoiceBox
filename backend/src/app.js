const express = require('express');
const cors = require('cors');
const invoiceRoutes = require('./routes/invoices');
const clientRoutes = require('./routes/clients');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.use('/api/invoices', invoiceRoutes);
app.use('/api/clients', clientRoutes);

app.use(errorHandler);

module.exports = app;
