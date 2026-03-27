import React, { useEffect, useState } from 'react';
import { getInvoices, createInvoice, deleteInvoice } from '../services/invoiceService';
import InvoiceList from '../components/InvoiceList';
import InvoiceForm from '../components/InvoiceForm';

function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  function load() {
    setLoading(true);
    getInvoices()
      .then(setInvoices)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
  }, []);

  async function handleCreate(data) {
    try {
      await createInvoice(data);
      setShowForm(false);
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this invoice?')) return;
    try {
      await deleteInvoice(id);
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) return <p>Loading invoices…</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Invoices</h1>
      <button onClick={() => setShowForm(!showForm)} style={{ marginBottom: '1rem' }}>
        {showForm ? 'Cancel' : '+ New Invoice'}
      </button>
      {showForm && (
        <InvoiceForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} />
      )}
      <InvoiceList invoices={invoices} onDelete={handleDelete} />
    </div>
  );
}

export default Invoices;
