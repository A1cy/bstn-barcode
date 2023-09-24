import React from 'react';

// Availability and Stock Information Component
const AvailabilityStock = () => {
  return (
    // Replace this div with the HTML content related to Availability and Stock.
    
      <div className="availblity-stock-container">
        {/* availblity section */}
        <div className="availblity-Preordered">
          <div className="availblity-container">
            <p className="availble" id="availble">Estimated Time Of Arrival! ( 1/1/2024 )</p> {/* uncomment when needed */}
            {/* <p class="Not-Available" id="Not-Available">Not Available Anymore!</p>*/}
            {/* <p class="Arriving-Soon" id="Arriving-Soon">Arriving Soon!</p> */}
          </div>
          <div className="Preordered">
            <p id="Preordered">Preordered</p>
            <table id="Preordered-table">
              <tbody>
                <tr>
                  <td className="left-column" id="Preordered-Quantity">Quantity</td>
                  <td className="right-column" id="Preordered-num">5</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div> 
        {/* stock table section */}
        <div className="stock">
          <p id="Stock">Stock</p>
          <table id="stock-table">
            <tbody>
              <tr>
                <th className="left-column" id="Wearhouse">Warehouse</th>
                <th className="right-column" id="Quantity">Quantity</th>
              </tr>
              <tr>
                <td className="left-column" id="Wearhouse1">malaz</td>
                <td className="right-column" id="Quantity1">92</td>
              </tr>
              <tr>
                <td className="left-column" id="Wearhouse2">kh-b</td>
                <td className="right-column" id="Quantity2">17</td>
              </tr>
              <tr>
                <td className="left-column" id="Wearhouse3">branch</td>
                <td className="right-column" id="Quantity3">21</td>
              </tr>
              <tr>
                <td className="left-column" id="Wearhouse4">branch</td>
                <td className="right-column" id="Quantity4">73</td>
              </tr>
              <tr>
                <td className="left-column" id="Wearhouse5">brancj</td>
                <td className="right-column" id="Quantity5">7</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>   
  );
};

export default AvailabilityStock;
