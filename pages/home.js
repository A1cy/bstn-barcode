
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Html5Qrcode } from 'html5-qrcode';
import { Html5QrcodeSupportedFormats } from "html5-qrcode";
import Image from 'next/image';

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
    if (e) e.preventDefault();
    axios.post('/api/get-product', { sku })
      .then(response => {
        if (response.data && response.data.slug && response.data.category) {
          return axios.get(`/api/get-product-detail?slug=${response.data.slug}&category=${response.data.category}`);
        } else {
          throw new Error('Product not found');
        }
      })
      .then(detailResponse => {
        setProductDetail(detailResponse.data);
        setError(null);
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
    const scanner = scannerRef.current;
    let html5QrCode;
    if (showScanner && scanner) {
      console.log("Initializing scanner...");  // Debugging line
      Html5Qrcode.getCameras().then(devices => {
        console.log("Devices found:", devices);  // Debugging line
        if (devices && devices.length) {
          const backCamera = devices.find(device => device.label.toLowerCase().includes('back'));
          const cameraId = backCamera ? backCamera.id : devices[0].id;
          console.log("Using camera:", cameraId);  // Debugging line
          html5QrCode = new Html5Qrcode(scanner.id);
          html5QrCode.start(
            cameraId,
            {
              fps: 20,
              qrbox: 350,
              aspectRatio: 1.0, // Set aspect ratio to be square
              formatsToSupport: [ 
                Html5QrcodeSupportedFormats.QR_CODE,
                Html5QrcodeSupportedFormats.CODE128,
                Html5QrcodeSupportedFormats.CODE39,
                Html5QrcodeSupportedFormats.CODE93,
                Html5QrcodeSupportedFormats.CODABAR,
                Html5QrcodeSupportedFormats.DATA_MATRIX,
                Html5QrcodeSupportedFormats.EAN13,
                Html5QrcodeSupportedFormats.EAN8,
                Html5QrcodeSupportedFormats.ITF,
                Html5QrcodeSupportedFormats.MAXICODE,
                Html5QrcodeSupportedFormats.PDF417,
                Html5QrcodeSupportedFormats.RSS14,
                Html5QrcodeSupportedFormats.RSSEXPANDED,
                Html5QrcodeSupportedFormats.UPCA,
                Html5QrcodeSupportedFormats.UPCE,
                Html5QrcodeSupportedFormats.UPCEAN_EXTENSION,
              
              
              ]
            },
            qrCodeMessage => {
              console.log("QR Code scanned:", qrCodeMessage);  // Debugging line
              setSku(qrCodeMessage);
              handleSearch();
              html5QrCode.stop();
              setShowScanner(false);
            },
            errorMessage => {
              console.error("Scanner error:", errorMessage);  // Debugging line
              setError(errorMessage);
            }
          ).catch(err => {
            console.error("Scanner initialization error:", err);  // Debugging line
            setError(err);
          });
        }
      }).catch(err => {
        console.error("Error getting devices:", err);  // Debugging line
        setError("Error initializing scanner");
      });
    }
    return () => {
      if (html5QrCode) {
        html5QrCode.stop();
      }
    };
  }, [showScanner, handleSearch]);

  return (
    <div className="container">
      <header className="home-header">
        <Image src="/pics/BuildStation-logo.png" alt="Logo" width={150} height={150} className="logo"/> {/* Updated */}
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
            <Image src={productDetail.item.image} alt={productDetail.item.title} width={150} height={150}/> {/* Updated */}
            <p>Price: {productDetail.item.price}</p>
          </div>
        )}
      </main>
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



