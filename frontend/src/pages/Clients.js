import React, { useEffect, useState } from 'react';
import { getClients } from '../services/clientService';
import ClientList from '../components/ClientList';

function Clients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getClients()
      .then(setClients)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading clients…</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Clients</h1>
      <ClientList clients={clients} />
    </div>
  );
}

export default Clients;
