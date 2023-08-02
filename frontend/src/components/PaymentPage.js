import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  console.log(searchParams)
  const premiumAmount = searchParams.get('amount');

  return (
    <div>
      <button onClick={() => navigate(-1)}>go back</button>
      <h2>Payment Page</h2>
      <p>Premium Amount: {premiumAmount}</p>
      {/* Payment methods and payment processing logic */}
    </div>
  );
};

export default PaymentPage;
