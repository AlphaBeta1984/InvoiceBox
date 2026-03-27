import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Invoices from './pages/Invoices';
import Clients from './pages/Clients';

function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: '1rem', borderBottom: '1px solid #ddd', display: 'flex', gap: '1rem' }}>
        <strong>InvoiceBox</strong>
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/invoices">Invoices</NavLink>
        <NavLink to="/clients">Clients</NavLink>
      </nav>
      <main style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/clients" element={<Clients />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
