const Invoice = require('../models/Invoice');

function list(req, res) {
  res.json(Invoice.findAll());
}

function show(req, res) {
  const invoice = Invoice.findById(req.params.id);
  if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
  res.json(invoice);
}

function create(req, res) {
  const invoice = Invoice.create(req.body);
  res.status(201).json(invoice);
}

function update(req, res) {
  const invoice = Invoice.update(req.params.id, req.body);
  if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
  res.json(invoice);
}

function destroy(req, res) {
  const deleted = Invoice.remove(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Invoice not found' });
  res.status(204).end();
}

module.exports = { list, show, create, update, destroy };
