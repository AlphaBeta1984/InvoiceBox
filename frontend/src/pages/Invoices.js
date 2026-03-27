import React, { useEffect, useState } from 'react';
import { getInvoices } from '../services/invoiceService';
import InvoiceList from '../components/InvoiceList';

function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getInvoices()
      .then(setInvoices)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading invoices…</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Invoices</h1>
      <InvoiceList invoices={invoices} />
    </div>
  );
}

export default Invoices;
