import React from 'react';

function InvoiceList({ invoices }) {
  if (!invoices.length) return <p>No invoices yet.</p>;

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={th}>Invoice #</th>
          <th style={th}>Client</th>
          <th style={th}>Issue Date</th>
          <th style={th}>Due Date</th>
          <th style={th}>Status</th>
          <th style={th}>Total</th>
        </tr>
      </thead>
      <tbody>
        {invoices.map((inv) => (
          <tr key={inv.id}>
            <td style={td}>{inv.invoiceNumber}</td>
            <td style={td}>{inv.clientId}</td>
            <td style={td}>{inv.issueDate}</td>
            <td style={td}>{inv.dueDate}</td>
            <td style={td}>{inv.status}</td>
            <td style={td}>${inv.total}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const th = { textAlign: 'left', borderBottom: '2px solid #ccc', padding: '0.5rem' };
const td = { borderBottom: '1px solid #eee', padding: '0.5rem' };

export default InvoiceList;
