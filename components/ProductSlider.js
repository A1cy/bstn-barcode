import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import { useRouter } from "next/router";

// Custom Arrow component
const CustomArrow = ({ type, onClick }) => {
  return (
    <button
      className={`splide__arrow splide__arrow--${type}`}
      type="button"
      aria-controls="splide01-track"
      aria-label={`${type === "prev" ? "Previous" : "Next"} slide`}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 40 40"
        width="40"
        height="40"
      >
        <path d="m15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z"></path>
      </svg>
    </button>
  );
};

const ProductSlider = ({ title, uuid, item_code}) => {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (uuid) {
      axios
        .get(`/api/get-related-products?uuid=${uuid}`)
        .then((response) => {
          const relatedProducts = response.data.data;
          setProducts(relatedProducts || []);
        })
        .catch((error) => {
          console.error("Error fetching related products:", error);
        });
    }
  }, [uuid]);

  const navigateToProductDetail = (e, item_code) => {
    e.preventDefault();
    if (item_code) {
      router.push(`/productDetail?sku=${item_code}`);
    } else {
      console.error("SKU is undefined for this product. Navigation aborted.");
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    nextArrow: <CustomArrow type="next" />,
    prevArrow: <CustomArrow type="prev" />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="">
      <div className="products-category">
        <div className="container">
          <div className="row">
            <div className="Related-Products">
              <div className="splide__track">
                <p
                  className="products-category-header"
                  id={title.replace(" ", "-")}
                >
                  {title}
                </p>
                <hr className="devider-products-category" />

                <Slider {...settings}>
                  {products.map((product, index) => {
                    const defaultImage = product.item?.default_image;
                    const title = product.item?.item_lang?.[0]?.title;
                    const price = product.variant?.regular_price || "N/A";
                    const item_code = product.variant?.item_code;

                    // if (!item_code) {
                    //   console.error("Missing SKU for product:", product);
                    // }

                    return (
                      <div key={index} className="col-sm-4 splide__slide m-2">
                        <div className="card text-white">
                          <div className="card-body">
                            <a
                               
                              onClick={(e) => navigateToProductDetail(e, item_code)}
                            >
                              <img
                                src={`https://dyq4yrh81omo6.cloudfront.net/items/290/${defaultImage}`}
                                alt="product pic"
                              />
                            </a>
                            <p className="card-title">{title}</p> 
                            <span className="product-sku">
                              {/* SKU: {item_code} */}
                            </span>
                            {/* <div className="price inline">
                              <p className="card-price">{price}</p>
                              <h3 className="card-currency">SAR</h3> 
                            </div> */}
{/*                             
                           
                            
                            
                            
                            <p className="vat">Inclusive of VAT</p> */}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSlider;
