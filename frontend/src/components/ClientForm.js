import React, { useState } from 'react';

function ClientForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState(
    initial || {
      name: '',
      email: '',
      phone: '',
      address: '',
    }
  );

  function setField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <div style={row}>
        <label>
          Name:{' '}
          <input
            value={form.name}
            onChange={(e) => setField('name', e.target.value)}
            required
          />
        </label>
        <label>
          Email:{' '}
          <input
            type="email"
            value={form.email}
            onChange={(e) => setField('email', e.target.value)}
            required
          />
        </label>
      </div>
      <div style={row}>
        <label>
          Phone:{' '}
          <input
            value={form.phone}
            onChange={(e) => setField('phone', e.target.value)}
          />
        </label>
        <label>
          Address:{' '}
          <input
            value={form.address}
            onChange={(e) => setField('address', e.target.value)}
          />
        </label>
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

export default ClientForm;
