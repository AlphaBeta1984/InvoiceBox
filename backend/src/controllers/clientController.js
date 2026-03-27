const Client = require('../models/Client');

const ALLOWED_FIELDS = ['name', 'email', 'phone', 'address'];

function pick(obj, keys) {
  const result = {};
  for (const key of keys) {
    if (obj[key] !== undefined) result[key] = obj[key];
  }
  return result;
}

async function list(req, res) {
  const clients = await Client.findAll();
  res.json(clients);
}

async function show(req, res) {
  const client = await Client.findById(req.params.id);
  if (!client) return res.status(404).json({ message: 'Client not found' });
  res.json(client);
}

async function create(req, res) {
  const client = await Client.create(pick(req.body, ALLOWED_FIELDS));
  res.status(201).json(client);
}

async function update(req, res) {
  const client = await Client.update(req.params.id, pick(req.body, ALLOWED_FIELDS));
  if (!client) return res.status(404).json({ message: 'Client not found' });
  res.json(client);
}

async function destroy(req, res) {
  const deleted = await Client.remove(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Client not found' });
  res.status(204).end();
}

module.exports = { list, show, create, update, destroy };
