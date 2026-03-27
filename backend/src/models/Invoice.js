const pool = require('../config/db');

const COLUMNS = 'id, client_id, invoice_number, issue_date, due_date, status, items, total';

async function findAll() {
  const { rows } = await pool.query(
    `SELECT ${COLUMNS} FROM invoices ORDER BY created_at DESC`
  );
  return rows.map(toInvoice);
}

async function findById(id) {
  try {
    const { rows } = await pool.query(
      `SELECT ${COLUMNS} FROM invoices WHERE id = $1`,
      [id]
    );
    return rows[0] ? toInvoice(rows[0]) : null;
  } catch (err) {
    if (err.code === '22P02') return null;
    throw err;
  }
}

async function create(data) {
  const { rows } = await pool.query(
    `INSERT INTO invoices (client_id, invoice_number, issue_date, due_date, status, items, total)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING ${COLUMNS}`,
    [
      data.clientId,
      data.invoiceNumber,
      data.issueDate,
      data.dueDate,
      data.status || 'draft',
      JSON.stringify(data.items),
      data.total,
    ]
  );
  return toInvoice(rows[0]);
}

async function update(id, data) {
  try {
    const { rows } = await pool.query(
      `UPDATE invoices
       SET client_id = $2, invoice_number = $3, issue_date = $4,
           due_date = $5, status = $6, items = $7, total = $8
       WHERE id = $1
       RETURNING ${COLUMNS}`,
      [
        id,
        data.clientId,
        data.invoiceNumber,
        data.issueDate,
        data.dueDate,
        data.status,
        JSON.stringify(data.items),
        data.total,
      ]
    );
    return rows[0] ? toInvoice(rows[0]) : null;
  } catch (err) {
    if (err.code === '22P02') return null;
    throw err;
  }
}

async function remove(id) {
  try {
    const { rowCount } = await pool.query('DELETE FROM invoices WHERE id = $1', [id]);
    return rowCount > 0;
  } catch (err) {
    if (err.code === '22P02') return false;
    throw err;
  }
}

async function _reset() {
  await pool.query('TRUNCATE invoices CASCADE');
}

function toInvoice(row) {
  return {
    id: row.id,
    clientId: row.client_id,
    invoiceNumber: row.invoice_number,
    issueDate:
      row.issue_date instanceof Date
        ? row.issue_date.toISOString().slice(0, 10)
        : row.issue_date,
    dueDate:
      row.due_date instanceof Date
        ? row.due_date.toISOString().slice(0, 10)
        : row.due_date,
    status: row.status,
    items: typeof row.items === 'string' ? JSON.parse(row.items) : row.items,
    total: Number(row.total),
  };
}

module.exports = { findAll, findById, create, update, remove, _reset };
