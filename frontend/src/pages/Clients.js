import React, { useEffect, useState } from 'react';
import { getClients, createClient, deleteClient } from '../services/clientService';
import ClientList from '../components/ClientList';
import ClientForm from '../components/ClientForm';

function Clients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  function load() {
    setLoading(true);
    getClients()
      .then(setClients)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
  }, []);

  async function handleCreate(data) {
    try {
      await createClient(data);
      setShowForm(false);
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this client?')) return;
    try {
      await deleteClient(id);
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) return <p>Loading clients…</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Clients</h1>
      <button onClick={() => setShowForm(!showForm)} style={{ marginBottom: '1rem' }}>
        {showForm ? 'Cancel' : '+ New Client'}
      </button>
      {showForm && (
        <ClientForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} />
      )}
      <ClientList clients={clients} onDelete={handleDelete} />
    </div>
  );
}

export default Clients;
