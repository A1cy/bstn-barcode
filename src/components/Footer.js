import React, { useState } from 'react';
import QRBarcodeScanner from 'react-qr-barcode-scanner';

function Footer() {
  const [showScanner, setShowScanner] = useState(false);

  const handleScan = data => {
    if (data) {
      console.log(`Scanned data: ${data}`);
      setShowScanner(false); // Close the scanner after a successful scan
    }
  };

  const handleError = err => {
    console.error(err);
    setShowScanner(false); // Close the scanner in case of an error
  };

  return (
    <footer>
      <div className="navbar">
        <a href="#" className="active">
          <img src="pics/home-icon.png" alt="home" />
          <p id="home-footer">HOME</p>
        </a>

        <div className="scanner-section">
          <a href="#" onClick={e => {e.preventDefault(); setShowScanner(true)}}>
            <img src="pics/scan-icon.png" alt="scan" />
            <p id="scan-footer">SCAN A NEW PRODUCT</p>
          </a>

          {showScanner && (
            <div className="scanner-modal">
              <div className="scanner-content">
                <QRBarcodeScanner
                  delay={300}
                  onError={handleError}
                  onScan={handleScan}
                  style={{ width: '100%' }}
                />
                <button className="close-button" onClick={() => setShowScanner(false)}>Close</button>
              </div>
            </div>
          )}

        </div>

        <a href="#">
          <img src="pics/list-icon.png" alt="list" />
          <p id="list-footer">LIST</p>
        </a>
      </div>

      <div className="end-footer">
        <div id="left-end-footer">
          <a href="#" id="terms">Terms and Conditions</a>
          <a href="#" className="space-between1" id="privacy">Privacy Policy</a>
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
