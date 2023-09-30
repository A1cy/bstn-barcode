import React, { useState } from 'react';
 


const HomePage = ({ onNavigateToProduct }) => {
  const [sku, setSku] = useState('');

  const handleSkuSubmit = (e) => {
    e.preventDefault();
    onNavigateToProduct(sku);
  };
  const [showScanner, setShowScanner] = useState(false);

  const handleScan = data => {
    if (data) {
      console.log(`Scanned data: ${data}`);
      setShowScanner(false); // Close the scanner after a successful scan
    }
  };

  const handleError = err => {
    console.error(err);
    setShowScanner(false); // Close the scanner in case of an error
  };

  return (
    <div>
    {/* <HeaderContentContainer /> */}
    <div className="home-container">
      <header className="home-header">
        <img src="pics\BuildStation-logo.png" alt="Logo" className="logo"/>
      </header>

      <main className="home-main">
        <form onSubmit={handleSkuSubmit} className="sku-form">
        <button className="scan-button" onClick={e => {e.preventDefault(); setShowScanner(true)}}>Scan Barcode</button>

          <input 
            type="text" 
            value={sku} 
            onChange={(e) => setSku(e.target.value)} 
            placeholder="Enter SKU" 
            className="sku-input"
          />
          <button className="sku-submit-button" onClick={handleSkuSubmit}>Go to Product</button>

        </form>
      </main>
    </div>
    </div>
  );
};

export default HomePage;
