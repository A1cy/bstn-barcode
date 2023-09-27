import React, { useState } from 'react';
import HeaderContentContainer from '../components/HeaderContentContainer';
import Footer from '../components/Footer';

const HomePage = ({ onNavigateToProduct }) => {
  const [sku, setSku] = useState('');

  const handleSkuSubmit = () => {
    // Navigate to the product page with the provided SKU
    onNavigateToProduct(sku);
  };

  return (
    <div>
        <HeaderContentContainer />
      <h1>Home</h1>
      {/* Add your additional home page elements here */}
      <input type="text" value={sku} onChange={(e) => setSku(e.target.value)} placeholder="Enter SKU" />
      <button onClick={handleSkuSubmit}>Go to Product</button>
      <Footer />
    </div>
  );
};

export default HomePage;
