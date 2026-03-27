import React from 'react';

function ClientList({ clients }) {
  if (!clients.length) return <p>No clients yet.</p>;

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={th}>Name</th>
          <th style={th}>Email</th>
          <th style={th}>Phone</th>
        </tr>
      </thead>
      <tbody>
        {clients.map((client) => (
          <tr key={client.id}>
            <td style={td}>{client.name}</td>
            <td style={td}>{client.email}</td>
            <td style={td}>{client.phone || '—'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const th = { textAlign: 'left', borderBottom: '2px solid #ccc', padding: '0.5rem' };
const td = { borderBottom: '1px solid #eee', padding: '0.5rem' };

export default ClientList;
