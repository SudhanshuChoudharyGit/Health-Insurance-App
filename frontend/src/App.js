import React from 'react';
import Form from './components/Form'; // Form component for the main page
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Router and Route components for routing
import PaymentPage from './components/PaymentPage.js'; // PaymentPage component for the payment page
import './styles/app.css'; // Import CSS styles for the app


const App = () => {
  return (
    // Use React Router to enable routing in the app
    <Router>
      <Routes>
        {/* Route for the main page, path="/" indicates the root URL */}
        <Route path="/" element={<Form />} />
        {/* Route for the payment page, path="/paymentpage" indicates the URL for payment page */}
        <Route path="/paymentpage" element={<PaymentPage />} />
      </Routes>
    </Router>
  );
};

export default App;
