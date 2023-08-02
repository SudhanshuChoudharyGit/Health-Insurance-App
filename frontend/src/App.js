import React from 'react';
import Form from './components/Form';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PaymentPage from './components/PaymentPage.js';

const App = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Form />} />
      <Route path="/paymentpage" element={<PaymentPage />} />
    </Routes>
  </Router>
  );
};

export default App;
