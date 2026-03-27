const Invoice = require('../models/Invoice');

const ALLOWED_FIELDS = ['clientId', 'invoiceNumber', 'issueDate', 'dueDate', 'status', 'items'];
const VALID_STATUSES = ['draft', 'sent', 'paid', 'overdue'];

function pick(obj, keys) {
  const result = {};
  for (const key of keys) {
    if (obj[key] !== undefined) result[key] = obj[key];
  }
  return result;
}

async function list(req, res) {
  const invoices = await Invoice.findAll();
  res.json(invoices);
}

async function show(req, res) {
  const invoice = await Invoice.findById(req.params.id);
  if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
  res.json(invoice);
}

async function create(req, res) {
  const data = pick(req.body, ALLOWED_FIELDS);
  if (Array.isArray(data.items)) {
    data.total = data.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  }
  if (data.status && !VALID_STATUSES.includes(data.status)) {
    return res.status(422).json({ message: `status must be one of: ${VALID_STATUSES.join(', ')}` });
  }
  if (!data.status) data.status = 'draft';
  const invoice = await Invoice.create(data);
  res.status(201).json(invoice);
}

async function update(req, res) {
  const data = pick(req.body, ALLOWED_FIELDS);
  if (Array.isArray(data.items)) {
    data.total = data.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  }
  if (data.status && !VALID_STATUSES.includes(data.status)) {
    return res.status(422).json({ message: `status must be one of: ${VALID_STATUSES.join(', ')}` });
  }
  const invoice = await Invoice.update(req.params.id, data);
  if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
  res.json(invoice);
}

async function destroy(req, res) {
  const deleted = await Invoice.remove(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Invoice not found' });
  res.status(204).end();
}

module.exports = { list, show, create, update, destroy };
