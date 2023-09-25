import React from 'react';

// Product Details Component
const ProductDetails = () => {
   return (
      <div className="content-container">
        <div className="images-container">
          <section id="image-carousel" className="splide">
            <div className="splide__track">
              <ul className="splide__list">
                <li className="splide__slide"><img src="/pics/product1.png" alt="product pic" /></li>
                {/* Add more <li> here for more images */}
              </ul>
            </div>
          </section>
          <section id="thumbnail-carousel" className="splide">
            <div className="splide__track">
              <ul className="splide__list">
                <li className="splide__slide"><img src="/pics/product1.png" alt="product pic" /></li>
                {/* Add more <li> here for more images */}
              </ul>
            </div>
          </section>
        </div>
        <div className="product-content">
          <h1 id="product-name">Angle valve - AVE002</h1>
          <div className="inline">
            <img className="tiny-logo" src="/pics/Hatch-logo.png" alt="brand logo" />
            <p id="brand-name">Hatch Sanitary</p>
          </div>
          <p id="product-code">Product Code: SW01330082</p>
          <div className="price inline">
            <h1>45.00</h1>
            <p id="currncy">SAR</p>
          </div>
          <div className="buttons-container">
            <button className="Add-to-List" id="Add-to-List">Add to List</button>
            <button className="Lost-a-Sale" id="Lost-a-Sale">Lost a Sale</button>
          </div>
        </div>
      </div>
    );
  };

export default ProductDetails;
