import React from 'react';
import { useNavigate } from 'react-router-dom'; // Hook for programmatic navigation
import { useLocation } from 'react-router-dom'; // Hook to access the current location


const PaymentPage = () => {
  // Navigate function to use for programmatic navigation
  const navigate = useNavigate();

  // Access the current location and extract the query parameters
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const premiumAmount = searchParams.get('amount');

  return (
    <div>
      {/* "go back" button to navigate back to the previous page */}
      <button onClick={() => navigate(-1)}>go back</button>

      <h2>Payment Page</h2>
      {/* Display the Premium Amount received as a query parameter */}
      <p>Premium Amount: {premiumAmount}</p>
    </div>
  );
};


export default PaymentPage;
