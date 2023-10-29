import React, { useState, useCallback } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { BarcodeFormat, BrowserMultiFormatReader, DecodeHintType , NotFoundException} from "@zxing/library";


export default function Home() {
  const [showScanner, setShowScanner] = useState(false);
  const [sku, setSku] = useState("");
  const [productDetail, setProductDetail] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();
  const codeReader = new BrowserMultiFormatReader();

  const handleSkuChange = (e) => {
    setSku(e.target.value);
  };

 

 

 
  const startScanning = () => {
    const hints = new Map();
    hints.set(DecodeHintType.POSSIBLE_FORMATS, [BarcodeFormat.QR_CODE, BarcodeFormat.CODE_128, BarcodeFormat.CODE_39, BarcodeFormat.EAN_13, BarcodeFormat.EAN_8, BarcodeFormat.CODABAR, BarcodeFormat.ITF, BarcodeFormat.UPC_A, BarcodeFormat.UPC_E, BarcodeFormat.PDF_417, BarcodeFormat.AZTEC]);

    hints.set(DecodeHintType.TRY_HARDER, true);
    codeReader.reset();
    codeReader.decodeFromVideoDevice(undefined, "barcode-scanner", (result, err) => {
      if (result) {
        setSku(result.text);
        setShowScanner(false);
        codeReader.reset();
      }

      if (err && !(err instanceof NotFoundException)) {
        console.error(err);
        setError("Failed to decode barcode.");
      }
    }, hints);
  };


  const stopScanning = () => {
    codeReader.reset();
    setShowScanner(false);
  };

  const handleScanButtonClick = () => {
    setShowScanner(true);
    startScanning();
  };
  const initializeScanner = useCallback(() => {
    const codeReader = new BrowserMultiFormatReader();
    codeReader
      .listVideoInputDevices()
      .then((videoInputDevices) => {
        const sourceSelect = document.getElementById("sourceSelect");
        selectedDevice = videoInputDevices[0].deviceId;

        // Specify the formats you want to support
        codeReader.decodeFromVideoDevice(
          selectedDevice,
          "barcode-scanner",
          (result, err) => {
            if (result) {
              // Successful scan
              // Provide feedback (this can be visual or audio feedback)
              // For now, we're just updating the SKU state
              setSku(result.text);
              setShowScanner(false);
            }
            if (err && !(err instanceof NotFoundException)) {
              console.error(err);
              setError("Error while scanning. Please try again.");
            }
          },
          {
            formats: [
              BarcodeFormat.CODE_128,
              BarcodeFormat.QR_CODE /* add other formats here */,
            ],
          }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
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
            <p className="scanner-instructions">
              Ensure the barcode or QR code fills the scanning box for better
              accuracy.
            </p>
            <div className="container-scanner">
              <div className="scanner-content">
                <video id="barcode-scanner" className="scanner"></video>
                <div className="guidelines"></div>
              </div>
            </div>
            <button className="scan-button" onClick={startScanning}>
              Reset Scanning
            </button>
            <button className="close-button" onClick={stopScanning}>
              Close Scanner
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
