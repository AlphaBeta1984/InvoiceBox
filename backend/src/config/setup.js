require('dotenv').config();
const { readFileSync } = require('fs');
const { join } = require('path');
const pool = require('./db');

async function setup() {
  const sql = readFileSync(join(__dirname, 'schema.sql'), 'utf8');
  await pool.query(sql);
  console.log('Database schema created successfully.');
  await pool.end();
}

setup().catch((err) => {
  console.error('Database setup failed:', err.message);
  process.exit(1);
});
