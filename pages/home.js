import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import jsQR from "jsqr";
import Quagga from "quagga";
import Image from "next/image";
import Webcam from "react-webcam";

export default function Home() {
  const [sku, setSku] = useState("");
  const [error, setError] = useState(null);
  const [productDetail, setProductDetail] = useState(null);
  const [showScanner, setShowScanner] = useState(false);
  const [scanMode, setScanMode] = useState("QR"); // Initial scanning mode
  const webcamRef = useRef(null);

  const handleSkuChange = (e) => {
    setSku(e.target.value);
  };

  const handleSearch = (e, scannedSku) => {
    const targetSku = scannedSku || sku;
    if (e) e.preventDefault();
    axios
      .post("/api/get-product", { sku: targetSku })
      .then((response) => {
        if (response.data && response.data.slug && response.data.category) {
          return axios.get(
            `/api/get-product-detail?slug=${response.data.slug}&category=${response.data.category}`
          );
        } else {
          throw new Error("Product not found");
        }
      })
      .then((detailResponse) => {
        setProductDetail(detailResponse.data);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        if (
          err.message === "Product not found" ||
          (err.response && err.response.status === 404)
        ) {
          setError("Product not found");
        } else {
          setError("Failed to fetch product");
        }
      });
  };

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
    if (webcamRef.current && webcamRef.current.video) {
      const videoElement = webcamRef.current.video;

      Quagga.init(
        {
          inputStream: {
            type: "LiveStream",
            target: videoElement, // Reference to the video element of the Webcam component
          },
          decoder: {
            readers: ["code_128_reader", "ean_reader"], // Add the readers you need
          },
        },
        function (err) {
          if (err) {
            console.log(err);
            return;
          }
          console.log("Initialization finished. Ready to start");
          Quagga.start();

          Quagga.onDetected((result) => {
            console.log(result.codeResult.code);
            setSku(result.codeResult.code);
            handleSearch(null, result.codeResult.code);
            setShowScanner(false);
            Quagga.stop(); // Stop Quagga after a barcode is detected
          });
        }
      );
    }
  }, [webcamRef, handleSearch, setSku, setShowScanner]);

  useEffect(() => {
    if (showScanner) {
      const intervalId = setInterval(() => {
        setScanMode((prevMode) => (prevMode === "QR" ? "BARCODE" : "QR"));
      }, 1000); // Switch mode every second or adjust as needed
      return () => clearInterval(intervalId);
    }
  }, [showScanner]);

  useEffect(() => {
    if (showScanner) {
      if (scanMode === "QR") {
        captureQR();
      } else if (scanMode === "BARCODE") {
        captureBarcode();
      }
    }
  }, [showScanner, scanMode, captureQR, captureBarcode]);

  return (
    <div className="container">
      <header className="home-header">
        <Image src="/pics/BuildStation-logo.png" alt="Logo" width={150} height={150} className="logo" />
      </header>
      <div id="welcome">
        <p id="instructions" className="instructions">
        <main className="home-main">
        <i class="barcode-icon"></i>
        <br/>
        <button type="button" className="scan-button" onClick={() => setShowScanner(true)}>Start Scanning</button>
      </main>
        <h2 id="heading">Instructions:</h2>
          Click on "Start Scanning" to activate the scanner.<br/>
          Point your camera to a QR code or barcode to scan.<br/>
          Results will be displayed below.
        </p>
        <div id="form" className="form">
          <input id="myInput" placeholder="Or enter SKU manually..." type="text" value={sku} onChange={handleSkuChange} />
          <button className="submit" onClick={handleSearch}>SUBMIT</button>
        </div>
        <div id="output">
          {error && <p className="error-message">{error}</p>}
          {productDetail && productDetail.item && (
            <div className="product-details">
              <h2><strong>Product Name:</strong> {productDetail.item.title}</h2>
              <Image src={productDetail.item.image} alt={productDetail.item.title} width={150} height={150} />
              <p>Price: {productDetail.item.price}</p>
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
              onUserMedia={() => {
                if (scanMode === "BARCODE") {
                  captureBarcode();
                }
              }}
            />
            <button className="close-button" onClick={() => setShowScanner(false)}>Close Scanner</button>
          </div>
        </div>
      )}
    </div>
  );
  
}
