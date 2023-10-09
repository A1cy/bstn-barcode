import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
// import Html5Qrcode from "html5-qrcode";
import { Html5Qrcode } from 'html5-qrcode';


export default function Home() {
  const [sku, setSku] = useState("");
  const [error, setError] = useState(null);
  const [productDetail, setProductDetail] = useState(null);
  const [showScanner, setShowScanner] = useState(false);

  const scannerRef = useRef(null);


  const handleSkuChange = (e) => {
    setSku(e.target.value);
  };


  const handleSearch = (e) => {
    e.preventDefault(); // Prevent default form submission
    axios.post('/api/get-product', { sku })
        // ... (rest of your axios calls)
        .then(response => {
          if (response.data && response.data.slug && response.data.category) {
              return axios.get(`/api/get-product-detail?slug=${response.data.slug}&category=${response.data.category}`);
          } else {
              throw new Error('Product not found');
          }
      })
      .then(detailResponse => {
          setProductDetail(detailResponse.data);
      })
      .catch(err => {
          console.error(err);
          if (err.message === 'Product not found' || (err.response && err.response.status === 404)) {
              setError('Product not found');
          } else {
              setError('Failed to fetch product');
          }
      });
  };

useEffect(() => {
    let html5QrCode;
    const scanner = scannerRef.current;
    if (showScanner && scanner) {
      Html5Qrcode.getCameras().then(devices => {
        if (devices && devices.length) {
          const backCamera = devices.find(device => device.label.toLowerCase().includes('back'));
          const cameraId = backCamera ? backCamera.id : devices[0].id; 
          html5QrCode = new Html5Qrcode(scanner.id);
          html5QrCode.start(
            cameraId,
            {
              fps: 10,
              qrbox: 250  
            },
            qrCodeMessage => {
              setSku(qrCodeMessage);
              handleSearch();
              html5QrCode.stop();
            },
            errorMessage => {
              setError(errorMessage);
            }
          ).catch(err => setError(err));
        }
      });
    }

    return () => {
      if (html5QrCode) {
        html5QrCode.stop();
      }
    };
  }, [showScanner]);

  return (
    <div className="container">
            <header className="home-header">
        <img src="pics\BuildStation-logo.png" alt="Logo" className="logo"/>
      </header>
      <main className="home-main">
        <form onSubmit={handleSearch} className="sku-form">
          <input type="text" name="sku" value={sku} onChange={handleSkuChange} />
          <button type="button" className="scan-button" onClick={() => setShowScanner(true)}>Scan Barcode</button>
          
        </form>
        {error && <p>{error}</p>}
        {productDetail && productDetail.item && (
          <div>
            <h2>{productDetail.item.title}</h2>
            <img src={productDetail.item.image} alt={productDetail.item.title} />
            <p>Price: {productDetail.item.price}</p>
          </div>
        )}
      </main>
      {/* ... (rest of your JSX) */}
      {showScanner && (
        <div className="scanner-modal">
          <div className="scanner-content">
            <div id="qr-reader" ref={scannerRef}></div>
            <button className="close-button" onClick={() => setShowScanner(false)}>Close</button>
          </div>
        </div>
      )}
 </div>
  );
}

 