import React from 'react';

const AvailabilityStock = ({ data }) => {
  if (!data || !data.item) return null;

  const { availability, stock_quantity } = data.item;

  return (
    
      <div className="availblity-stock-container">
        {/* availability section */}
          <div className="availblity-container">
            {availability ? 
              <p className="availble" id="availble">Available</p> : 
              <p className="Not-Available" id="Not-Available">Not Available Anymore!</p>
            }
          </div>
        <div className="availblity-Preordered">
          {/* I'm not sure about the Preordered section, so I'm leaving it as is for now */}
          <div className="Preordered">
            <p id="Preordered">Preordered</p>
            <table id="Preordered-table">
              <tbody>
                <tr>
                  <td className="left-column" id="Preordered-Quantity">Quantity</td>
                  <td className="right-column" id="Preordered-num"> ∞ </td>
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
             
              {/* Assuming a single warehouse for simplicity, you might want to loop over multiple warehouses if needed */}
              <tr>
                <td className="left-column" id="Wearhouse1">Main Warehouse</td>
                <td className="right-column" id="Quantity1">{stock_quantity}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>   
    
  );
};

export default AvailabilityStock;