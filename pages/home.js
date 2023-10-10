import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import jsQR from "jsqr";
import Image from 'next/image';

export default function Home() {
  const [sku, setSku] = useState("");
  const [error, setError] = useState(null);
  const [productDetail, setProductDetail] = useState(null);
  const [showScanner, setShowScanner] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

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

const startScanner = () => {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          requestAnimationFrame(tick);
        }
      })
      .catch(err => {
        console.error(err);
        setError("Failed to access camera. Please ensure camera permissions are granted and the device is compatible.");
      });
  } else {
    setError("Your browser or device does not support camera access for scanning. Please use a different device or update your browser.");
  }
};





  const tick = () => {
    if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext("2d");
      canvas.height = video.videoHeight;
      canvas.width = video.videoWidth;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);
      if (code) {
        setSku(code.data);
        handleSearch();
        setShowScanner(false);
        videoRef.current.pause();
        if (videoRef.current && videoRef.current.srcObject) {
          videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        }
      } else {
        requestAnimationFrame(tick);
      }
    } else {
      if(videoRef.current) {
        requestAnimationFrame(tick);
      }
    }
  };
  
  useEffect(() => {
    if (showScanner) {
      startScanner();
    }
  }, [showScanner]);
  

  // ... (render logic)
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
          <video ref={videoRef} style={{ width: '100%' }}></video>
          <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
          <button className="close-button" onClick={() => {
            setShowScanner(false);
            videoRef.current.pause();
            if (videoRef.current.srcObject) {
              videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            }
          }}>Close</button>
        </div>
      </div>
    )}
  </div>
  );
}

