import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { BrowserBarcodeReader } from '@zxing/library';

export default function Home() {
  const [sku, setSku] = useState("");
  const [error, setError] = useState(null);
  const [productDetail, setProductDetail] = useState(null);
  const [showScanner, setShowScanner] = useState(false);

  const router = useRouter();

  const handleSkuChange = (e) => {
    setSku(e.target.value);
  };

  const codeReader = new BrowserBarcodeReader();
  const videoRef = React.createRef();

  const startScanning = () => {
    setShowScanner(true);
    codeReader.decodeFromVideoDevice(undefined, videoRef.current)
      .then(result => {
        if (result) {
          setSku(result.text);
          handleSearch(null, result.text);
          stopScanning();
        }
      })
      .catch(err => console.error(err));
  };

  const stopScanning = () => {
    codeReader.reset();
    setShowScanner(false);
  };

  const handleSearch = useCallback(
    async (e, scannedSku) => {
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
        if (
          err.message === "Product not found" ||
          (err.response && err.response.status === 404)
        ) {
          setError("Product not found");
        } else {
          setError("Failed to fetch product");
        }
      }
    },
    [sku]
  );

  const captureBarcode = useCallback(() => {
    if (webcamRef.current && webcamRef.current.video) {
      const videoElement = webcamRef.current.video;

      Quagga.init(
        {
          inputStream: {
            type: "LiveStream",
            target: videoElement,
            constraints: {
              width: 1280,  // Higher resolution for better scanning
              height: 720,
              facingMode: "environment",
            },
          },
          locator: {
            patchSize: "large",
            halfSample: true,
          },
          numOfWorkers: navigator.hardwareConcurrency || 4,
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
            ],
            multiple: false,
          },
          locate: true,
        },
        function (err) {
          if (err) {
            console.log(err);
            return;
          }

          Quagga.start();

          Quagga.onDetected((result) => {
            console.log(result.codeResult.code);
            setSku(result.codeResult.code);
            handleSearch(null, result.codeResult.code);
            setShowScanner(false);
            Quagga.stop();
          });
        }
      );
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
            Start Scanning
          </button>
        </main>
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
                width={100}
                height={100}
                className="to-image"
              />

              <p>Price: {productDetail.item.price}</p>
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
      </div>

      {showScanner && (
        <div className="scanner-modal">
          <div className="scanner-content">
            <video id="barcode-scanner"></video>
            <button className="start-button" onClick={startScanning}>Start Scanning</button>
            <button className="stop-button" onClick={stopScanning}>Stop Scanning</button>
          </div>
        </div>
      )}
    </div>
  );
}
