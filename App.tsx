import React from 'react';
import { MemoryRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Scraping from './pages/Scraping';
import EmailAutomation from './pages/EmailAutomation';
import SocialMedia from './pages/SocialMedia';
import Products from './pages/Products';

const App: React.FC = () => {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="scraping" element={<Scraping />} />
          <Route path="email" element={<EmailAutomation />} />
          <Route path="social" element={<SocialMedia />} />
          <Route path="products" element={<Products />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
};

export default App;