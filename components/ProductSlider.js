import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
 
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

const ProductSlider = ({ title, uuid }) => {
  console.log("UUID in ProductSlider:", uuid ?? "UUID is undefined");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (uuid) {
      axios
        .get(`/api/get-related-products?uuid=${uuid}`)
        .then((response) => {
          // Ensure that the structure of the data matches response.data.data
          const relatedProducts = response.data.data;
          console.log("Related products fetched:", relatedProducts);  // Log to check the data
          setProducts(relatedProducts || []);
        })
        .catch((error) => {
          console.error("Error fetching related products:", error);
        });
    }
  }, [uuid]);


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
    <div className="gray">
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
                
                {/* Simplified Slider rendering to show product names */}
                <Slider {...settings}>
                {products && products.length > 0 ? (
  products.map((product, index) => (
    <div key={index} className="col-sm-4 splide__slide m-2">
      <div className="card text-white">
        <div className="card-body">
          <a href="#">
            <img src={`https://dyq4yrh81omo6.cloudfront.net/products/${product.item.default_image}`} alt="product pic" />
          </a>
          <p className="card-title">{product.item.item_lang[0].title}</p>
          <div className="price inline">
            {/* <p className="card-price">{product.variant.regular_price}</p> */}
            <h1 className="card-currncy">SAR</h1>
          </div>
          <p className="vat">Inclusive of VAT</p>
        </div>
      </div>
    </div>
  ))
) : (
  <p>No related products found.</p>
)}
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