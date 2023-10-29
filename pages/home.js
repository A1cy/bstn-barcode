import React, { useState, useCallback } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { BrowserMultiFormatReader } from '@zxing/library';

export default function Home() {
  const [sku, setSku] = useState("");
  const [error, setError] = useState(null);
  const [productDetail, setProductDetail] = useState(null);
  const [showScanner, setShowScanner] = useState(false);

  const router = useRouter();

  const handleSkuChange = (e) => {
    setSku(e.target.value);
  };

  const codeReader = new BrowserMultiFormatReader();

  const startScanning = () => {
    codeReader.decodeFromInputVideoDevice(undefined, 'barcode-scanner')
      .then(result => {
        setSku(result.text);
        handleSearch(null, result.text);
        setShowScanner(false);
      }).catch(err => console.error(err));
  };

  const stopScanning = () => {
    codeReader.reset();
  };

  const handleScanButtonClick = () => {
    setShowScanner(true);
  };

  const handleSearch = useCallback(
    (e, scannedSku) => {
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
    },
    [sku]
  );

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
