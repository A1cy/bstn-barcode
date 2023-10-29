import { useRouter } from "next/router";
import { useState } from 'react';
import { BrowserMultiFormatReader } from "@zxing/library";

function Footer() {
  const router = useRouter();
  const [showScanner, setShowScanner] = useState(false);
  const [error, setError] = useState(null);
  const codeReader = new BrowserMultiFormatReader();

  const startScanning = () => {
    setError(null);
    const videoElem = document.getElementById("barcode-scanner-footer");
    codeReader.decodeFromVideoDevice(null, videoElem, (result, err) => {
      if (result) {
        // Scanned successfully
        setShowScanner(false);
        router.push(`/productDetail?sku=${result.text}`);
      } else if (err && err.name !== "NotFoundException") {
        setError("Failed to decode barcode.");
      }
    });
  };

  const stopScanning = () => {
    codeReader.reset();
    setShowScanner(false);
  };

  return (
    <footer>
      {/* ... other components ... */}
      <div className="navbar">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            router.push("/home");
          }}
        >
          <img src="pics/home-icon.png" alt="home" />
          <p id="home-footer">HOME</p>
        </a>
        <div className="scanner-section">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setShowScanner(true);
              startScanning();
            }}
          >
            <img src="pics/scan-icon.png" alt="scan" />
            <p id="scan-footer">OPEN SCANNER</p>
          </a>
        </div>

        <a href="#">
          <img src="pics/list-icon.png" alt="list" />
          <p id="list-footer">LIST</p>
        </a>
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
                <video id="barcode-scanner-footer" className="scanner"></video>
                <div className="guidelines"></div>
              </div>
              {error && <p className="error-message">{error}</p>}
            </div>
            <button className="scan-button" onClick={startScanning}>
              Start Scanning
            </button>
            <button className="close-button" onClick={stopScanning}>
              Close Scanner
            </button>
          </div>
        </div>
      )}{" "}
      <div className="end-footer">
        <div id="left-end-footer">
          <a href="#" id="terms">
            Terms and Conditions
          </a>
          <a href="#" className="space-between1" id="privacy">
            Privacy Policy
          </a>
        </div>
        <div id="space-between2"></div>
        <div id="right-end-footer">
          <p id="rights">© 2022 Build Station. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
