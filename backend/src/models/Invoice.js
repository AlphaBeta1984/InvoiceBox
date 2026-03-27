/**
 * Invoice model
 *
 * @typedef {Object} Invoice
 * @property {string}  id          - Unique identifier (UUID)
 * @property {string}  clientId    - Reference to the owning client
 * @property {string}  invoiceNumber - Human-readable invoice number
 * @property {Date}    issueDate   - Date the invoice was issued
 * @property {Date}    dueDate     - Payment due date
 * @property {'draft'|'sent'|'paid'|'overdue'} status
 * @property {LineItem[]} items    - Line items on the invoice
 * @property {number}  total       - Total amount (sum of item subtotals)
 */

/**
 * @typedef {Object} LineItem
 * @property {string} description
 * @property {number} quantity
 * @property {number} unitPrice
 */

/**
 * In-memory store (replace with a real database in production).
 * @type {Invoice[]}
 */
let invoices = [];

function findAll() {
  return [...invoices];
}

function findById(id) {
  return invoices.find((inv) => inv.id === id) || null;
}

function create(data) {
  const invoice = { id: crypto.randomUUID(), ...data };
  invoices.push(invoice);
  return invoice;
}

function update(id, data) {
  const index = invoices.findIndex((inv) => inv.id === id);
  if (index === -1) return null;
  invoices[index] = { ...invoices[index], ...data };
  return invoices[index];
}

function remove(id) {
  const index = invoices.findIndex((inv) => inv.id === id);
  if (index === -1) return false;
  invoices.splice(index, 1);
  return true;
}

function _reset() {
  invoices = [];
}

module.exports = { findAll, findById, create, update, remove, _reset };
