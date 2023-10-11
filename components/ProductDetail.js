
import React, { useEffect } from 'react';
import '@splidejs/splide/dist/css/splide.min.css';
import Splide from '@splidejs/splide';

const ProductDetails = ({ data }) => {
  useEffect(() => {
    if (data) {
      const primarySlider = new Splide('#image-carousel', {
        rewind: true,
        pagination: false,
        arrows: true,
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
          },},      });

      primarySlider.sync(secondarySlider);
      primarySlider.mount();
      secondarySlider.mount();
    }
  }, [data]);

  if (!data) return null;

  const baseURL = "https://dyq4yrh81omo6.cloudfront.net/items/580/";
  const brandBaseURL = "https://dyq4yrh81omo6.cloudfront.net/thumbnails/small/brands/";

  return (
    <div className="header-content-container">
      <div className="content-container">
        <div className="images-container">
          <section id="image-carousel" className="splide">
            <div className="splide__track">
              <ul className="splide__list">
                {data.item.variant.images.map((img, index) => (
                  <li key={index} className="splide__slide">
                    <img src={`${baseURL}${img}`} alt={`product pic ${index + 1}`} />
                  </li>
                ))}
              </ul>
            </div>
          </section>
          <section id="thumbnail-carousel" className="splide splide--nav">
            <div className="splide__track">
              <ul className="splide__list">
                {data.item.variant.images.map((img, index) => (
                  <li key={index} className="splide__slide">
                    <img src={`${baseURL}${img}`} alt={`thumbnail ${index + 1}`} />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
        <div className="product-content">
          <h1 id="product-name">{data.item.title}</h1>
          <div className="inline">
          <img className="tiny-logo" src={`${brandBaseURL}${data.item.brand_image}`} alt="brand logo" />
            <p id="brand-name">{data.item.brand}</p>
          </div>
          <p id="product-code">Product Code: {data.item.item_code}</p>
          <div className="price inline">
            <h1>{data.item.price.toFixed(2)}</h1>
            <p id="currency">SAR</p>
          </div>
          <div className="buttons-container">
            <button className="Add-to-List" id="Add-to-List">Add to List</button>
            <button className="Lost-a-Sale" id="Lost-a-Sale">Lost a Sale</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

