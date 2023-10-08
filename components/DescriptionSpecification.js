import React from 'react';

// Description and Specification Component
const DescriptionSpecification = () => {
  return (
    // Replace this div with the HTML content related to Description and Specification.
    <div className="header-content-container">
   <div className="Description-Specification-container">
        {/* Description section */}
        <div className="inline-Description">
          <div className="Description ">
            <p id="Description-heading">Description</p>
            <hr />
            <p id="Description-content">With this choice. Available in Saudi Arabia and the Gulf countries for smart living. It is connected to wifi to be controlled from the application and from anywhere in the world, and when the network is interrupted, you can control it through Bluetooth via the illus illus application. Features: Easy to use You can control the intensity of lighting, the color tone. Dimmable works with Alexa, Google Assist and Siri. Other specifications: They correspond to the internal dimming of the lighting by </p>
          </div>
        </div> {/* Specification section */}
        <div className="Specification">
          <p id="Specification">Specification</p>
          <hr />
          <table className="specification-table">
            <tbody>
              <tr>
                <td className="left-column" id="CRI">CRI</td>
                <td className="right-column" id="CRI-num">90</td>
              </tr>
              <tr>
                <td className="left-column" id="Temperature">Temperature</td>
                <td className="right-column" id="Temperature-num">-20°C~45°C</td>
              </tr>
              <tr>
                <td className="left-column" id="SwitchingCycle-num">50000</td>
                <td className="right-column" id="SwitchingCycle">Switching Cycle</td>
              </tr>
              <tr>
                <td className="left-column" id="LifeSpan">Life Span (at hour)</td>
                <td className="right-column" id="LifeSpan-num">15000</td>
              </tr>
              <tr>
                <td className="left-column" id="Dimmer-yes">Yes</td>
                <td className="right-column" id="Dimmer">Dimmer</td>
              </tr>
              <tr>
                <td className="left-column" id="ip">IP</td>
                <td className="right-column" id="ip-num">20</td>
              </tr>
              <tr>
                <td className="left-column" id="Angle-degree">220°</td>
                <td className="right-column" id="Angle">Beam Angle</td>
              </tr>
            </tbody>
          </table>
        </div> {/* user-manual section */}
        <div className="padding-user-manual">
          <div className="user-manual">
            <p id="User-manual">User manual</p>
            <hr />
            <div className="pdf-icon-padding"> <a href="myfile.pdf" download> <img className="pdf-icon" src="pics\pdf-icon.png" alt="pdf" /> <span id="User-manual-pdf">User manual</span></a> <a href="myfile.pdf" download> <img className="pdf-icon" src="pics\pdf-icon.png" alt="Video" /> <span id="User-manual-Videos">Videos</span></a> </div>
          </div>
        </div>
      </div>
      </div>
          
  );
};

export default DescriptionSpecification;
