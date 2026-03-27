const Client = require('../models/Client');

function list(req, res) {
  res.json(Client.findAll());
}

function show(req, res) {
  const client = Client.findById(req.params.id);
  if (!client) return res.status(404).json({ message: 'Client not found' });
  res.json(client);
}

function create(req, res) {
  const client = Client.create(req.body);
  res.status(201).json(client);
}

function update(req, res) {
  const client = Client.update(req.params.id, req.body);
  if (!client) return res.status(404).json({ message: 'Client not found' });
  res.json(client);
}

function destroy(req, res) {
  const deleted = Client.remove(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Client not found' });
  res.status(204).end();
}

module.exports = { list, show, create, update, destroy };
