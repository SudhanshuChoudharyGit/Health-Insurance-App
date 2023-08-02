import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/form.css';

const Form = () => {
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [adultAges, setAdultAges] = useState([]);
  const [childAges, setChildAges] = useState([]);
  const [premium, setPremium] = useState(null);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCover, setSelectedCover] = useState('');
  const [selectedTenure, setSelectedTenure] = useState('');
  const [errorMsg, setErrorMsg] = useState(false);

  

  const navigate = useNavigate();

  const handleAddAdult = () => {
    if (adults < 2) {
      setAdults(adults + 1);
      setAdultAges([...adultAges, '']);
    }
  };

  const handleRemoveAdult = () => {
    if (adults > 1) {
      setAdults(adults - 1);
      setAdultAges(adultAges.slice(0, -1));
    }
  };

  const handleAddChild = () => {
    if (children < 4 && adults > 0) {
      setChildren(children + 1);
      setChildAges([...childAges, '']);
    }
  };

  const handleRemoveChild = () => {
    if (children > 0) {
      setChildren(children - 1);
      setChildAges(childAges.slice(0, -1));
    }
  };

  const handleAdultAgeChange = (index, value) => {
    const updatedAges = [...adultAges];
    updatedAges[index] = value;
    setAdultAges(updatedAges);
  };

  const handleChildAgeChange = (index, value) => {
    const updatedAges = [...childAges];
    updatedAges[index] = value;
    setChildAges(updatedAges);
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleCoverChange = (e) => {
    setSelectedCover(e.target.value);
  };

  const handleTenureChange = (e) => {
    setSelectedTenure(e.target.value);
  };

  const handleSubmit = () => {
    // Check if at least 1 adult is selected
    if (adults === 0) {
      alert('Select at least 1 adult to calculate premium.');
      return;
    }

    // Prepare data to send to the backend
    const ages = [...adultAges, ...childAges];

    const data = {
      ages: ages,
      city: selectedCity, // Use selectedCity value
    cover: selectedCover, // Use selectedCover value
    tenure: selectedTenure, // Empty value for tenure
    };

    // Send data to the backend for premium calculation
    fetch('http://localhost:3001/api/calculate_premium', {
      method: 'POST',
      mode: "cors",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        // Handle the received premium data
        setPremium(data.premium);
      })
      .catch((error) => {
        setErrorMsg(true);
        console.error('Error:', error);
      });
  };

  const handleAddToCart = () => {
    // Navigate to the payment page with the premium amount as a query parameter
    navigate(`/paymentpage?amount=${premium}`);
  };

  return (
    <div>
      <h1>Health Insurance Premium Calculator</h1>
      <div>
        <label>Adults:</label>
        <button onClick={handleAddAdult}>+</button>
        <button onClick={handleRemoveAdult}>-</button>
        <br />
        {adultAges.map((age, index) => (
          <input
            key={index}
            type="number"
            value={age}
            onChange={(e) => handleAdultAgeChange(index, e.target.value)}
            min="18"
            max="90"
          />
        ))}
      </div>
      <div>
        <label>Children:</label>
        <button onClick={handleAddChild} disabled={adults === 0}>
          +
        </button>
        <button onClick={handleRemoveChild}>-</button>
        <br />
        {childAges.map((age, index) => (
          <input
            key={index}
            type="number"
            value={age}
            onChange={(e) => handleChildAgeChange(index, e.target.value)}
            min="0"
            max="17"
          />
        ))}
      </div>
      <div>
        <label>City:</label>
        <select required value={selectedCity} onChange={handleCityChange}>
          <option value="">Select City</option>
          <option value="1">Tier 1</option>
          <option value="2">Tier 2</option>
        </select>
      </div>
      <div>
        <label>Cover:</label>
        <select required value={selectedCover} onChange={handleCoverChange}>
          <option value="">Select Cover</option>
          <option value="300000">3,00,000</option>
          <option value="400000">4,00,000</option>
          <option value="500000">5,00,000</option>
        </select>
      </div>
      <div>
        <label>Tenure:</label>
        <select required value={selectedTenure} onChange={handleTenureChange}>
          <option value="">Select Tenure</option>
          <option value="1">1 year</option>
          <option value="2">2 years</option>
          <option value="3">3 years</option>
        </select>
      </div>
      <button
        onClick={handleSubmit}
        disabled={!selectedCity || !selectedCover || !selectedTenure}
      >
        Calculate Premium
      </button>
      {errorMsg  && (
        <div>
          <p>Please Select Adult Age Between 18 to 90 
            <br/>
            And Child age below 18
          </p>
        </div>
      )}
      {premium !== null && (
        <div>
          <p>Premium: {premium}</p>
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      )}
    </div>
  );
};

export default Form;






