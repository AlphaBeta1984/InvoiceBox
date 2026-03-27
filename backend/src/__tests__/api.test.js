process.env.DATABASE_URL =
  process.env.TEST_DATABASE_URL || 'postgresql://localhost:5432/invoicebox_test';

const request = require('supertest');
const { readFileSync } = require('fs');
const { join } = require('path');
const app = require('../app');
const pool = require('../config/db');

beforeAll(async () => {
  const sql = readFileSync(join(__dirname, '../config/schema.sql'), 'utf8');
  await pool.query(sql);
});

beforeEach(async () => {
  await pool.query('TRUNCATE invoices, clients CASCADE');
});

afterAll(async () => {
  await pool.end();
});

describe('GET /health', () => {
  it('returns status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});

describe('404 handler', () => {
  it('returns 404 for unknown routes', async () => {
    const res = await request(app).get('/unknown');
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Not found');
  });
});

describe('Clients API', () => {
  const validClient = { name: 'Acme Corp', email: 'acme@example.com' };

  it('POST /api/clients creates a client', async () => {
    const res = await request(app).post('/api/clients').send(validClient);
    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Acme Corp');
    expect(res.body.id).toBeDefined();
  });

  it('POST /api/clients ignores injected id field', async () => {
    const res = await request(app)
      .post('/api/clients')
      .send({ ...validClient, id: 'hacked' });
    expect(res.status).toBe(201);
    expect(res.body.id).not.toBe('hacked');
  });

  it('POST /api/clients rejects invalid email', async () => {
    const res = await request(app)
      .post('/api/clients')
      .send({ name: 'Bad', email: 'not-an-email' });
    expect(res.status).toBe(422);
  });

  it('GET /api/clients returns all clients', async () => {
    await request(app).post('/api/clients').send(validClient);
    const res = await request(app).get('/api/clients');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  });

  it('DELETE /api/clients/:id removes the client', async () => {
    const created = await request(app).post('/api/clients').send(validClient);
    const res = await request(app).delete(`/api/clients/${created.body.id}`);
    expect(res.status).toBe(204);
  });
});

describe('Invoices API', () => {
  let clientId;

  beforeEach(async () => {
    const res = await request(app)
      .post('/api/clients')
      .send({ name: 'Test Client', email: 'test@example.com' });
    clientId = res.body.id;
  });

  function validInvoice() {
    return {
      clientId,
      invoiceNumber: 'INV-001',
      issueDate: '2024-01-01',
      dueDate: '2024-01-31',
      status: 'draft',
      items: [{ description: 'Service', quantity: 1, unitPrice: 100 }],
    };
  }

  it('POST /api/invoices creates an invoice with server-calculated total', async () => {
    const res = await request(app).post('/api/invoices').send(validInvoice());
    expect(res.status).toBe(201);
    expect(res.body.invoiceNumber).toBe('INV-001');
    expect(res.body.id).toBeDefined();
    expect(res.body.total).toBe(100);
  });

  it('POST /api/invoices ignores injected id field', async () => {
    const res = await request(app)
      .post('/api/invoices')
      .send({ ...validInvoice(), id: 'hacked-id' });
    expect(res.status).toBe(201);
    expect(res.body.id).not.toBe('hacked-id');
  });

  it('POST /api/invoices rejects invalid status', async () => {
    const res = await request(app)
      .post('/api/invoices')
      .send({ ...validInvoice(), status: 'invalid' });
    expect(res.status).toBe(422);
  });

  it('GET /api/invoices returns all invoices', async () => {
    await request(app).post('/api/invoices').send(validInvoice());
    const res = await request(app).get('/api/invoices');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  });

  it('GET /api/invoices/:id returns 404 for unknown id', async () => {
    const res = await request(app).get('/api/invoices/no-such-id');
    expect(res.status).toBe(404);
  });

  it('POST /api/invoices validates required fields', async () => {
    const res = await request(app).post('/api/invoices').send({});
    expect(res.status).toBe(422);
    expect(res.body.errors).toBeDefined();
  });

  it('POST /api/invoices validates item fields', async () => {
    const res = await request(app)
      .post('/api/invoices')
      .send({
        ...validInvoice(),
        items: [{ description: '', quantity: -1, unitPrice: -5 }],
      });
    expect(res.status).toBe(422);
  });

  it('DELETE /api/invoices/:id removes the invoice', async () => {
    const created = await request(app).post('/api/invoices').send(validInvoice());
    const res = await request(app).delete(`/api/invoices/${created.body.id}`);
    expect(res.status).toBe(204);
  });
});
