import React, { useState, useRef, useCallback } from "react";
import axios from "axios";
import Image from "next/image";
import Webcam from "react-webcam";
import { BrowserMultiFormatReader, NotFoundException, ChecksumException, FormatException } from '@zxing/library';

export default function Home() {
    const [sku, setSku] = useState("");
    const [error, setError] = useState(null);
    const [productDetail, setProductDetail] = useState(null);
    const [showScanner, setShowScanner] = useState(false);
    const webcamRef = useRef(null);

    const handleSkuChange = (e) => {
        setSku(e.target.value);
    };

    const handleScanButtonClick = () => {
        setShowScanner(true);
    };

    const handleSearch = useCallback(async (e, scannedSku) => {
        const targetSku = scannedSku || sku;
        if (e) e.preventDefault();
        try {
            const response = await axios.post("/api/get-product", { sku: targetSku });
            if (response.data && response.data.slug && response.data.category) {
                const detailResponse = await axios.get(`/api/get-product-detail?slug=${response.data.slug}&category=${response.data.category}`);
                setProductDetail(detailResponse.data);
                setError(null);
            } else {
                throw new Error("Product not found");
            }
        } catch (err) {
            if (err.message === "Product not found" || (err.response && err.response.status === 404)) {
                setError("Product not found");
            } else {
                setError("Failed to fetch product");
            }
        }
    }, [sku]);

    const captureScan = useCallback(() => {
      if (webcamRef.current) {
          const imageSrc = webcamRef.current.getScreenshot();
          if (imageSrc) {
              const image = new Image();
              image.onload = () => {
                  const canvas = document.createElement('canvas');
                  canvas.width = image.width;
                  canvas.height = image.height;
                  const ctx = canvas.getContext('2d');
                  ctx.drawImage(image, 0, 0);
                  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                  
                  const codeReader = new BrowserMultiFormatReader();
                  const result = codeReader.decodeFromImageData(imageData);
                  if (result) {
                      setSku(result.text);
                      handleSearch(null, result.text);
                      setShowScanner(false);
                  } else {
                      requestAnimationFrame(captureScan);
                  }
              };
              image.src = imageSrc;
          } else {
              setError("Failed to capture the image from webcam.");
          }
      }
  }, [webcamRef, handleSearch]);

    const closeScanner = useCallback(() => {
        setShowScanner(false);
    }, []);
  return (
    <div className="container-home">
      <header className="home-header">
        <Image
          src="/pics/BuildStation-logo.png"
          alt="Logo"
          width={150}
          height={150}
          className="logo"
          layout="responsive"
        />
      </header>
      <div id="welcome">
        <main className="home-main">
          <i className="barcode-icon"></i>
          <br />
          <button
            type="button"
            className="scan-button"
            onClick={() => handleScanButtonClick("QR")}
          >
            Scan QR Code
          </button>
          <button
            type="button"
            className="scan-button"
            onClick={() => handleScanButtonClick("BARCODE")}
          >
            Scan Barcode
          </button>
        </main>
        <br />
        {/* {showInstructions && (
          <div id="instructions" className="instructions">
            <h2 id="heading">Instructions:</h2>
            Click on a button to start scanning.
            <br />
            Point your camera to a QR code or barcode to scan.
            <br />
            Results will be displayed below.
          </div>
        )} */}
        <div id="form" className="form">
          <input
            id="myInput"
            placeholder="Or enter SKU manually..."
            type="text"
            value={sku}
            onChange={handleSkuChange}
          />
          <button className="submit" onClick={handleSearch}>
            SUBMIT
          </button>
        </div>
        <div id="output">
          {error && <p className="error-message">{error}</p>}
          {productDetail && productDetail.item && productDetail.meta_data && (
            <div className="product-details">
              <h2>
                <strong>Product Name:</strong> {productDetail.item.title}
              </h2>
              <Image
                src={`https://dyq4yrh81omo6.cloudfront.net/items/290/${productDetail.meta_data.image.replace(
                  "items/",
                  ""
                )}`}
                alt={
                  productDetail.meta_data.image_alt || productDetail.item.title
                }
                width={150}
                height={150}
              />
              <p>Price: {productDetail.item.price}</p>
              <button
                className="to-product-details"
                onClick={() => router.push(`/productDetail?sku=${sku}`)}
              >
                View Full Details
              </button>
            </div>
          )}
        </div>
      </div>
      {showScanner && (
        <div className="scanner-modal">
          <div className="scanner-content">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{ facingMode: "environment" }}
              onUserMedia={() => startScanning(scanMode)}
            />
            <button className="close-button" onClick={closeScanner}>Close Scanner</button>
          </div>
        </div>
      )}
    </div>
  );
}
