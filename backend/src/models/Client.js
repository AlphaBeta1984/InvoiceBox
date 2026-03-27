/**
 * Client model
 *
 * @typedef {Object} Client
 * @property {string} id      - Unique identifier (UUID)
 * @property {string} name    - Client / company name
 * @property {string} email   - Primary contact email
 * @property {string} [phone] - Optional phone number
 * @property {string} [address] - Optional mailing address
 */

/**
 * In-memory store (replace with a real database in production).
 * @type {Client[]}
 */
let clients = [];

function findAll() {
  return [...clients];
}

function findById(id) {
  return clients.find((c) => c.id === id) || null;
}

function create(data) {
  const client = { id: crypto.randomUUID(), ...data };
  clients.push(client);
  return client;
}

function update(id, data) {
  const index = clients.findIndex((c) => c.id === id);
  if (index === -1) return null;
  clients[index] = { ...clients[index], ...data };
  return clients[index];
}

function remove(id) {
  const index = clients.findIndex((c) => c.id === id);
  if (index === -1) return false;
  clients.splice(index, 1);
  return true;
}

function _reset() {
  clients = [];
}

module.exports = { findAll, findById, create, update, remove, _reset };
