import React from 'react';

// Footer Component
const Footer = () => {
  return (
    // HTML content related to the footer
    <footer>
      <div className="navbar">
        <a href="#" className="active">
          <img src="pics/home-icon.png" alt="home" />
          <p id="home-footer">HOME</p>
        </a>
        <a href="#">
          <img src="pics/scan-icon.png" alt="scan" />
          <p id="scan-footer">SCAN A NEW PRODUCT</p>
        </a>
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
};

export default Footer;
