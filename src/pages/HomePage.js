

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QRBarcodeScanner from 'react-qr-barcode-scanner';

const HomePage = ({ onNavigateToProduct }) => {
  const [sku, setSku] = useState('');
  const [searchItems, setSearchItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = new FormData();
        data.append('searchText', sku); // replace '612908' with SKU input value
        
        const config = {
          method: 'post',
          url: 'https://staging-ksa-v2.build-station.com/build-station-apis-v2/api/items/search-items-ajax',
          headers: { 
            'apikey': 'Your_API_Key',
            'lang': 'en', 
            'currency': 'SAR', 
            'country': 'SA', 
            ...data.getHeaders()
          },
          data : data
        };
        
        const response = await axios.request(config);
        setSearchItems(response.data); // Update this based on your actual API response
      } catch (error) {
        console.log(error);
      }
    };

    if (sku) {
      fetchData();
    }
  }, [sku]);

  // ... Rest of your code ...
  const handleUpdate = (data) => {
    // handle update logic here
    console.log('Update data:', data);
  };
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
      {/* ... Rest of your JSX ... */}
      <div className="home-container">
      <header className="home-header">
        <img src="pics\BuildStation-logo.png" alt="Logo" className="logo"/>
      </header>

      <main className="home-main">
        <form onSubmit={handleSkuSubmit} className="sku-form">
        <button className="scan-button" onClick={e => {e.preventDefault(); setShowScanner(true)}}>Scan Barcode</button>
        {showScanner && (
            <div className="scanner-modal">
              <div className="scanner-content">
                <QRBarcodeScanner
                  delay={300}
                  onError={handleError}
                  onScan={handleScan}
                  onUpdate={handleUpdate}
                  style={{ width: '100%' }}
                />
                <button className="close-button" onClick={() => setShowScanner(false)}>Close</button>
              </div>
            </div>
          )}
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
      {/* Example of rendering search items (adjust based on actual API response structure) */}
      {searchItems.map(item => (
        <div key={item.id}>
          <p>{item.name}</p>
          {/* ... Render other item properties ... */}
        </div>
      ))}
    </div>
  );
};

export default HomePage;
