import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import jsQR from "jsqr";
import Image from 'next/image';
import Webcam from "react-webcam";


export default function Home() {
  const [sku, setSku] = useState("");
  const [error, setError] = useState(null);
  const [productDetail, setProductDetail] = useState(null);
  const [showScanner, setShowScanner] = useState(false);
  const webcamRef = useRef(null);

  const handleSkuChange = (e) => {
    setSku(e.target.value);
  };

  const handleSearch = (e, scannedSku) => {
    const targetSku = scannedSku || sku;
    if (e) e.preventDefault();
    axios.post('/api/get-product', { sku: targetSku })
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
 
  const capture = useCallback(() => {
    if (webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot();

        if (imageSrc) {
            const image = new window.Image();
            image.src = imageSrc;
            image.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = image.width;
                canvas.height = image.height;
                const context = canvas.getContext('2d');
                context.drawImage(image, 0, 0);
                const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                const code = jsQR(imageData.data, canvas.width, canvas.height);
                if (code) {
                    setSku(code.data);
                    handleSearch(null, code.data);
                    setShowScanner(false);
                } else {
                    requestAnimationFrame(capture);
                }
            };
        }
    }
}, [webcamRef, handleSearch]);

useEffect(() => {
    let animationFrameId;

    if (showScanner) {
        animationFrameId = requestAnimationFrame(capture);
    }

    return () => {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
    };
}, [showScanner, capture]);
 
return (
  <div className="container">
    <header className="home-header">
      <Image src="/pics/BuildStation-logo.png" alt="Logo" width={150} height={150} className="logo"/> 
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
          <Image src={productDetail.item.image} alt={productDetail.item.title} width={150} height={150}/> {/* Corrected */}
          <p>Price: {productDetail.item.price}</p>
        </div>
      )}
    </main>
    {showScanner && (
        <div className="scanner-modal">
          <div className="scanner-content">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              onUserMedia={() => setInterval(capture, 300)}
            />
            <button className="close-button" onClick={() => setShowScanner(false)}>Close</button>
          </div>
        </div>
      )}
  </div>
);
}

 
  