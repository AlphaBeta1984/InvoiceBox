const pool = require('../config/db');

async function findAll() {
  const { rows } = await pool.query(
    'SELECT id, name, email, phone, address FROM clients ORDER BY created_at DESC'
  );
  return rows;
}

async function findById(id) {
  try {
    const { rows } = await pool.query(
      'SELECT id, name, email, phone, address FROM clients WHERE id = $1',
      [id]
    );
    return rows[0] || null;
  } catch (err) {
    if (err.code === '22P02') return null; // invalid UUID format
    throw err;
  }
}

async function create(data) {
  const { rows } = await pool.query(
    `INSERT INTO clients (name, email, phone, address)
     VALUES ($1, $2, $3, $4)
     RETURNING id, name, email, phone, address`,
    [data.name, data.email, data.phone || null, data.address || null]
  );
  return rows[0];
}

async function update(id, data) {
  try {
    const { rows } = await pool.query(
      `UPDATE clients SET name = $2, email = $3, phone = $4, address = $5
       WHERE id = $1
       RETURNING id, name, email, phone, address`,
      [id, data.name, data.email, data.phone || null, data.address || null]
    );
    return rows[0] || null;
  } catch (err) {
    if (err.code === '22P02') return null;
    throw err;
  }
}

async function remove(id) {
  try {
    const { rowCount } = await pool.query('DELETE FROM clients WHERE id = $1', [id]);
    return rowCount > 0;
  } catch (err) {
    if (err.code === '22P02') return false;
    throw err;
  }
}

async function _reset() {
  await pool.query('TRUNCATE clients CASCADE');
}

module.exports = { findAll, findById, create, update, remove, _reset };
