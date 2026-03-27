const request = require('supertest');
const app = require('../app');
const Invoice = require('../models/Invoice');
const Client = require('../models/Client');

beforeEach(() => {
  Invoice._reset();
  Client._reset();
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

describe('Invoices API', () => {
  const validInvoice = {
    clientId: 'client-1',
    invoiceNumber: 'INV-001',
    issueDate: '2024-01-01',
    dueDate: '2024-01-31',
    status: 'draft',
    items: [{ description: 'Service', quantity: 1, unitPrice: 100 }],
  };

  it('POST /api/invoices creates an invoice with server-calculated total', async () => {
    const res = await request(app).post('/api/invoices').send(validInvoice);
    expect(res.status).toBe(201);
    expect(res.body.invoiceNumber).toBe('INV-001');
    expect(res.body.id).toBeDefined();
    expect(res.body.total).toBe(100);
  });

  it('POST /api/invoices ignores injected id field', async () => {
    const res = await request(app).post('/api/invoices').send({ ...validInvoice, id: 'hacked-id' });
    expect(res.status).toBe(201);
    expect(res.body.id).not.toBe('hacked-id');
  });

  it('POST /api/invoices rejects invalid status', async () => {
    const res = await request(app).post('/api/invoices').send({ ...validInvoice, status: 'invalid' });
    expect(res.status).toBe(422);
  });

  it('GET /api/invoices returns all invoices', async () => {
    Invoice.create({ ...validInvoice, total: 100 });
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
    const res = await request(app).post('/api/invoices').send({
      ...validInvoice,
      items: [{ description: '', quantity: -1, unitPrice: -5 }],
    });
    expect(res.status).toBe(422);
  });

  it('DELETE /api/invoices/:id removes the invoice', async () => {
    const { id } = Invoice.create({ ...validInvoice, total: 100 });
    const res = await request(app).delete(`/api/invoices/${id}`);
    expect(res.status).toBe(204);
    expect(Invoice.findById(id)).toBeNull();
  });
});

describe('Clients API', () => {
  const validClient = { name: 'Acme Corp', email: 'acme@example.com' };

  it('POST /api/clients creates a client', async () => {
    const res = await request(app).post('/api/clients').send(validClient);
    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Acme Corp');
  });

  it('POST /api/clients ignores injected id field', async () => {
    const res = await request(app).post('/api/clients').send({ ...validClient, id: 'hacked' });
    expect(res.status).toBe(201);
    expect(res.body.id).not.toBe('hacked');
  });

  it('POST /api/clients rejects invalid email', async () => {
    const res = await request(app)
      .post('/api/clients')
      .send({ name: 'Bad', email: 'not-an-email' });
    expect(res.status).toBe(422);
  });
});
