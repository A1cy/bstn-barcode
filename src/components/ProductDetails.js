import React, { useEffect } from 'react';
import '@splidejs/splide/dist/css/splide.min.css';
import Splide from '@splidejs/splide';

const ProductDetails = () => {
  useEffect(() => {
    const primarySlider = new Splide('#image-carousel', {
      type: 'fade',
      rewind: true,
      pagination: false,
      arrows: true,
      // Add more options here
    });

    const secondarySlider = new Splide('#thumbnail-carousel', {
      fixedWidth: 100,
      fixedHeight: 110,
      gap: 10,
      rewind: true,
      pagination: false,
      isNavigation: true,
      arrows: false,
      breakpoints : {
        984:{
          gap         : 0,
          fixedWidth : 90,
          fixedHeight: 80,
        },
        818:{
          gap         : 10,
          fixedWidth : 70,
          fixedHeight: 80,
        },
        730:{
          gap         : 15,
          fixedWidth : 60,
          fixedHeight: 80,
        },
        650:{
          gap         : 10,
          fixedWidth : 50,
          fixedHeight: 80,
        },
        500: {
          gap         : 10,
          fixedWidth : 100,
          fixedHeight: 100,
        },},
    });

    // Sync the primary slider with the secondary one.
    primarySlider.sync(secondarySlider);

    primarySlider.mount();
    secondarySlider.mount();
  }, []);

  // Your render code stays unchanged...
  
  return (
    <div className="content-container">
      <div className="images-container">
        <section id="image-carousel" className="splide splide--fade splide--rtl splide--draggable is-active is-initialized">
          <div className="splide__track">
            <ul className="splide__list">
              {/* Add your images here */}
              <li className="splide__slide"><img src="/pics/product1.png" alt="product pic"/></li>
              <li className="splide__slide"><img src="/pics/product1.png" alt="product pic"/></li>
              <li className="splide__slide"><img src="/pics/product1.png" alt="product pic"/></li>
              <li className="splide__slide"><img src="/pics/product2.png" alt="product pic"/></li>
              <li className="splide__slide"><img src="/pics/product3.png" alt="product pic"/></li>
              <li className="splide__slide"><img src="/pics/product4.png" alt="product pic"/></li>
              <li className="splide__slide"><img src="/pics/product5.png" alt="product pic"/></li>
              <li className="splide__slide"><img src="/pics/product6.png" alt="product pic"/></li>
              {/* ... */}
            </ul>
          </div>
        </section>
        <section id="thumbnail-carousel" className="splide splide--slide splide--rtl splide--draggable splide--nav is-active is-initialized">
          <div className="splide__track">
            <ul className="splide__list">
              {/* Add your thumbnails here */}
              <li className="splide__slide"><img src="/pics/product1.png" alt="product pic"/></li>
              <li className="splide__slide"><img src="/pics/product2.png" alt="product pic"/></li>
              <li className="splide__slide"><img src="/pics/product3.png" alt="product pic"/></li>
              <li className="splide__slide"><img src="/pics/product4.png" alt="product pic"/></li>
              <li className="splide__slide"><img src="/pics/product5.png" alt="product pic"/></li>
              <li className="splide__slide"><img src="/pics/product6.png" alt="product pic"/></li>
              {/* ... */}
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
