import React, { useEffect } from "react";
import "@splidejs/splide/dist/css/splide.min.css";
import Splide from "@splidejs/splide";

const ProductDetails = ({ data }) => {
  useEffect(() => {
    if (data) {
      const primarySlider = new Splide("#image-carousel", {
        rewind: true,
        pagination: false,
        arrows: true,
      });

      const secondarySlider = new Splide("#thumbnail-carousel", {
        fixedWidth: 100,
        fixedHeight: 110,
        gap: 10,
        rewind: true,
        pagination: false,
        isNavigation: true,
        arrows: false,
        breakpoints: {
          984: {
            gap: 0,
            fixedWidth: 90,
            fixedHeight: 80,
          },
          818: {
            gap: 10,
            fixedWidth: 70,
            fixedHeight: 80,
          },
          730: {
            gap: 15,
            fixedWidth: 60,
            fixedHeight: 80,
          },
          650: {
            gap: 10,
            fixedWidth: 50,
            fixedHeight: 80,
          },
          500: {
            gap: 10,
            fixedWidth: 100,
            fixedHeight: 100,
          },
        },
      });

      primarySlider.sync(secondarySlider);
      primarySlider.mount();
      secondarySlider.mount();
    }
  }, [data]);

  if (!data) return null;

  const baseURL = "https://dyq4yrh81omo6.cloudfront.net/items/580/";
  const brandBaseURL =
    "https://dyq4yrh81omo6.cloudfront.net/thumbnails/small/brands/";
  const colorimageURLBase =
    "https://dyq4yrh81omo6.cloudfront.net/thumbnails/small/items/";
  const compositionImageURLBase =
    "https://dyq4yrh81omo6.cloudfront.net/items/200/";

  return (
    <div className="content-container">
      <div className="images-container">
        <section id="image-carousel" className="splide">
          <div className="splide__track">
            <ul className="splide__list">
              {data.item.variant.images.map((img, index) => (
                <li key={index} className="splide__slide">
                  <img
                    src={`${baseURL}${img}`}
                    alt={`product pic ${index + 1}`}
                  />
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
                  <img
                    src={`${baseURL}${img}`}
                    alt={`thumbnail ${index + 1}`}
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
      <div className="product-content">
        <h1 id="product-name">{data.item.title}</h1>
        <div className="inline">
          <img
            className="tiny-logo"
            src={`${brandBaseURL}${data.item.brand_image}`}
            alt="brand logo"
          />
          <p id="brand-name">{data.item.brand}</p>
        </div>
        <p id="product-code">Product Code: {data.item.item_code}</p>
        <div className="price inline">
          <h1>{data.item.price.toFixed(2)}</h1>
          <p id="currency">SAR</p>
        </div>
        {/* <div className="product__color-picker">
          <h2>Body Color</h2>
          <div className="row">
            {data.item.attributes.map((attribute) =>
              attribute.type === "bodyColor" ? (
                <div className="col-3" key={attribute.uuid}>
                  <label className="product__color">
                    <a
                      href="javascript:void(null)"
                      className="variant-image"
                      data-toggle="tooltip"
                      title={attribute.title}
                      data-item-uuid={data.item.uuid}
                      data-item-attribute-uuid={attribute.uuid}
                      data-item-attribute-value-uuid={attribute.valueUuid}
                      data-item-attribute-title={attribute.title}
                      data-item-attribute-type={attribute.type}
                      data-modal-type="modalPopup"
                    >
                      <img
                        src={`https://dyq4yrh81omo6.cloudfront.net/thumbnails/small/items/${attribute.imageId}`}
                        data-isdefault={attribute.isDefault ? "1" : "0"}
                      />
                    </a>
                  </label>
                </div>
              ) : null
            )}
          </div>
        </div>
         <div className="product__composition">
          <h5 className="product__composition-title">COMPATIBLE ACCESSORIES</h5>
          <div className="splide slider__composite">
             <div className="splide__arrows">
             </div>

             <div className="splide__track">
              <ul className="splide__list">
                {data.item.compatible_accessories.map((accessory, index) => (
                  <li key={index} className="splide__slide">
                    <div className="product__composition-item">
                      <a href="#">
                        <img
                          className="product__composition-item-photo"
                          src={`${compositionImageURLBase}${accessory.item_image}`}
                        />
                      </a>
                      <button className="product__composition-item-content">
                        <h5 className="product__composition-item-title">
                          {accessory.title}
                        </h5>
                        <div className="product__composition-item-price">
                          {accessory.price.toFixed(2)} SAR
                        </div>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div> */}
        <div className="buttons-container">
          <button className="Add-to-List" id="Add-to-List">
            Add to List
          </button>
          <button className="Lost-a-Sale" id="Lost-a-Sale">
            Lost a Sale
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
