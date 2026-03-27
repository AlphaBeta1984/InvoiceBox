const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export async function getClients() {
  const res = await fetch(`${API_BASE}/clients`);
  if (!res.ok) throw new Error(`Failed to fetch clients (${res.status})`);
  return res.json();
}

export async function getClient(id) {
  const res = await fetch(`${API_BASE}/clients/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch client (${res.status})`);
  return res.json();
}

export async function createClient(data) {
  const res = await fetch(`${API_BASE}/clients`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Failed to create client (${res.status})`);
  return res.json();
}

export async function updateClient(id, data) {
  const res = await fetch(`${API_BASE}/clients/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Failed to update client (${res.status})`);
  return res.json();
}

export async function deleteClient(id) {
  const res = await fetch(`${API_BASE}/clients/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`Failed to delete client (${res.status})`);
}
