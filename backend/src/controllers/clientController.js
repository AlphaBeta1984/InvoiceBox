const Client = require('../models/Client');

const ALLOWED_FIELDS = ['name', 'email', 'phone', 'address'];

function pick(obj, keys) {
  const result = {};
  for (const key of keys) {
    if (obj[key] !== undefined) result[key] = obj[key];
  }
  return result;
}

function list(req, res) {
  res.json(Client.findAll());
}

function show(req, res) {
  const client = Client.findById(req.params.id);
  if (!client) return res.status(404).json({ message: 'Client not found' });
  res.json(client);
}

function create(req, res) {
  const client = Client.create(pick(req.body, ALLOWED_FIELDS));
  res.status(201).json(client);
}

function update(req, res) {
  const client = Client.update(req.params.id, pick(req.body, ALLOWED_FIELDS));
  if (!client) return res.status(404).json({ message: 'Client not found' });
  res.json(client);
}

function destroy(req, res) {
  const deleted = Client.remove(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Client not found' });
  res.status(204).end();
}

module.exports = { list, show, create, update, destroy };
