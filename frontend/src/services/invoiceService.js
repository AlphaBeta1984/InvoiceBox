const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export async function getInvoices() {
  const res = await fetch(`${API_BASE}/invoices`);
  if (!res.ok) throw new Error(`Failed to fetch invoices (${res.status})`);
  return res.json();
}

export async function getInvoice(id) {
  const res = await fetch(`${API_BASE}/invoices/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch invoice (${res.status})`);
  return res.json();
}

export async function createInvoice(data) {
  const res = await fetch(`${API_BASE}/invoices`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Failed to create invoice (${res.status})`);
  return res.json();
}

export async function updateInvoice(id, data) {
  const res = await fetch(`${API_BASE}/invoices/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Failed to update invoice (${res.status})`);
  return res.json();
}

export async function deleteInvoice(id) {
  const res = await fetch(`${API_BASE}/invoices/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`Failed to delete invoice (${res.status})`);
}
