

import React, { useState, useRef, useCallback } from "react";
import axios from "axios";
import jsQR from "jsqr";
import Quagga from "quagga";
import Image from "next/image";
import Webcam from "react-webcam";
import { useRouter } from 'next/router';

export default function Home() {
  const [sku, setSku] = useState("");
  const [error, setError] = useState(null);
  const [productDetail, setProductDetail] = useState(null);
  const [showScanner, setShowScanner] = useState(false);
  const [scanMode, setScanMode] = useState(null);
  const [showInstructions, setShowInstructions] = useState(true);
  const webcamRef = useRef(null);

  const router = useRouter();

  const handleSkuChange = (e) => {
    setSku(e.target.value);
  };

  const handleScanButtonClick = (mode) => {
    setShowInstructions(false);
    setShowScanner(true);
    setScanMode(mode);
  };

  const handleSearch = useCallback(async (e, scannedSku) => {
    const targetSku = scannedSku || sku;
    if (e) e.preventDefault();
    try {
      const response = await axios.post("/api/get-product", {
        sku: targetSku,
      });
      if (response.data && response.data.slug && response.data.category) {
        const detailResponse = await axios.get(
          `/api/get-product-detail?slug=${response.data.slug}&category=${response.data.category}`
        );
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

  const captureQR = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        const image = new window.Image();
        image.src = imageSrc;
        image.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = image.width;
          canvas.height = image.height;
          const context = canvas.getContext("2d");
          context.drawImage(image, 0, 0);
          const imageData = context.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          );
          const code = jsQR(imageData.data, canvas.width, canvas.height);
          if (code) {
            setSku(code.data);
            handleSearch(null, code.data);
            setShowScanner(false);
          } else {
            requestAnimationFrame(captureQR);
          }
        };
      }
    }
  }, [webcamRef, handleSearch]);

  const captureBarcode = useCallback(() => {
    if (webcamRef.current) {
      const videoElement = webcamRef.current.video;
      Quagga.init({
        inputStream: {
          type: "LiveStream",
          constraints: {
            width: videoElement.width,
            height: videoElement.height,
            facingMode: "environment",
            aspectRatio: videoElement.width / videoElement.height,
          },
          target: videoElement,
        },
        decoder: {
          readers: [
            "code_128_reader", 
            "ean_reader", 
            "ean_8_reader", 
            "code_39_reader", 
            "code_39_vin_reader", 
            "codabar_reader", 
            "upc_reader", 
            "upc_e_reader", 
            "i2of5_reader", 
            "2of5_reader", 
            "code_93_reader"
          ]
                },
      }, (err) => {
        if (err) {
          console.log(err);
          return;
        }
        Quagga.start();
        Quagga.onDetected((result) => {
          setSku(result.codeResult.code);
          handleSearch(null, result.codeResult.code);
          setShowScanner(false);
          Quagga.stop();
        });
      });
    }
  }, [webcamRef, handleSearch]);

  const closeScanner = useCallback(() => {
    if (webcamRef.current && webcamRef.current.stream) {
      const tracks = webcamRef.current.stream.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
    }
    setShowScanner(false);
    setScanMode(null);
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
            onClick={handleScanButtonClick}
          >
            Start Scanning 1
          </button>
        </main>
        <br />
        {showInstructions && (
          <div id="instructions" className="instructions">
            <h2 id="heading">Instructions:</h2>
            Click on Start Scanning to activate the scanner.
            <br />
            Point your camera to a QR code or barcode to scan.
            <br />
            Results will be displayed below.
          </div>
        )}

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
              {/* <h3>{productDetail.meta_data.meta_title}</h3> */}
              <p>{productDetail.meta_data.meta_description}</p>
              <button
                className="to-product-details"
                onClick={() => router.push(`/productDetail?sku=${sku}`)}
              >
                View Full Details
              </button>
            </div>
          )}
        </div>
      </div>      {showScanner && (
        <div className="scanner-modal">
          <div className="scanner-content">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{ facingMode: "environment" }}
              onUserMedia={() => {
                if (scanMode === "QR") {
                  captureQR();
                } else if (scanMode === "BARCODE") {
                  captureBarcode();
                }
              }}
            />
            <button className="close-button" onClick={closeScanner}>Close Scanner</button>
          </div>
        </div>
      )}
    </div>
  );
}
