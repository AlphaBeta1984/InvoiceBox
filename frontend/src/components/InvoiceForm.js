import React, { useState } from 'react';

const emptyItem = { description: '', quantity: 1, unitPrice: 0 };

function InvoiceForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState(
    initial || {
      clientId: '',
      invoiceNumber: '',
      issueDate: new Date().toISOString().slice(0, 10),
      dueDate: '',
      status: 'draft',
      items: [{ ...emptyItem }],
    }
  );

  function setField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function setItem(index, key, value) {
    setForm((prev) => {
      const items = [...prev.items];
      items[index] = { ...items[index], [key]: value };
      return { ...prev, items };
    });
  }

  function addItem() {
    setForm((prev) => ({ ...prev, items: [...prev.items, { ...emptyItem }] }));
  }

  function removeItem(index) {
    setForm((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      ...form,
      items: form.items.map((it) => ({
        description: it.description,
        quantity: Number(it.quantity),
        unitPrice: Number(it.unitPrice),
      })),
    };
    onSubmit(data);
  }

  const total = form.items.reduce(
    (s, it) => s + Number(it.quantity) * Number(it.unitPrice),
    0
  );

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <div style={row}>
        <label>
          Client ID:{' '}
          <input
            value={form.clientId}
            onChange={(e) => setField('clientId', e.target.value)}
            required
          />
        </label>
        <label>
          Invoice #:{' '}
          <input
            value={form.invoiceNumber}
            onChange={(e) => setField('invoiceNumber', e.target.value)}
            required
          />
        </label>
      </div>
      <div style={row}>
        <label>
          Issue Date:{' '}
          <input
            type="date"
            value={form.issueDate}
            onChange={(e) => setField('issueDate', e.target.value)}
            required
          />
        </label>
        <label>
          Due Date:{' '}
          <input
            type="date"
            value={form.dueDate}
            onChange={(e) => setField('dueDate', e.target.value)}
            required
          />
        </label>
        <label>
          Status:{' '}
          <select
            value={form.status}
            onChange={(e) => setField('status', e.target.value)}
          >
            <option value="draft">Draft</option>
            <option value="sent">Sent</option>
            <option value="paid">Paid</option>
            <option value="overdue">Overdue</option>
          </select>
        </label>
      </div>
      <h3>Items</h3>
      {form.items.map((item, i) => (
        <div key={i} style={row}>
          <input
            placeholder="Description"
            value={item.description}
            onChange={(e) => setItem(i, 'description', e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Qty"
            min="1"
            value={item.quantity}
            onChange={(e) => setItem(i, 'quantity', e.target.value)}
            required
            style={{ width: 80 }}
          />
          <input
            type="number"
            placeholder="Unit Price"
            min="0"
            step="0.01"
            value={item.unitPrice}
            onChange={(e) => setItem(i, 'unitPrice', e.target.value)}
            required
            style={{ width: 100 }}
          />
          {form.items.length > 1 && (
            <button type="button" onClick={() => removeItem(i)}>
              ✕
            </button>
          )}
        </div>
      ))}
      <button type="button" onClick={addItem} style={{ marginBottom: '0.5rem' }}>
        + Add Item
      </button>
      <div>
        <strong>Total: ${total.toFixed(2)}</strong>
      </div>
      <div style={{ marginTop: '0.5rem' }}>
        <button type="submit">Save</button>
        {onCancel && (
          <button type="button" onClick={onCancel} style={{ marginLeft: '0.5rem' }}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

const row = {
  display: 'flex',
  gap: '0.5rem',
  marginBottom: '0.5rem',
  alignItems: 'center',
  flexWrap: 'wrap',
};

export default InvoiceForm;
