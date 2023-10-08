import React from 'react';
import Slider from "react-slick";

// Custom Arrow component
const CustomArrow = ({ type, onClick }) => {
   return (
     <button className={`splide__arrow splide__arrow--${type}`} type="button" aria-controls="splide01-track" aria-label={`${type === 'prev' ? 'Previous' : 'Next'} slide`} onClick={onClick}>
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
         <path d="m15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z"></path>
       </svg>
     </button>
   );
 };
 

const ProductSlider = ({ title }) => {
  const products = [
    { name: 'Product 1', price: 29 },
    { name: 'Product 2', price: 322 },
    { name: 'Product 3', price: 324 },
    { name: 'Product 4', price: 326 },
    { name: 'Product 5', price: 372 },
    { name: 'Product 6', price: 362 },
    { name: 'Product 7', price: 334 },
    { name: 'Product 8', price: 322},
    { name: 'Product 9', price: 328 },
    { name: 'Product 10', price: 329 },
    // Add more products here
  ];

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
          slidesToShow: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2
        }
      }
    ]
  };

  return (
    <div className="gray">
      <div className="products-category">
        <div className="container">
          <div className="row">
            <div className="Related-Products">
              <div className="splide__track">
                <p className="products-category-header" id={title.replace(" ", "-")}>{title}</p>
                <hr className="devider-products-category" />
                <Slider {...settings}>
                  {products.map((product, index) => (
                    <div key={index} className="col-sm-4 splide__slide m-2">
                      <div className="card text-white">
                        <div className="card-body">
                          <a href="#"><img src="pics/slider.png" alt="product pic" /></a>
                          <p className="card-title">{product.name}</p>
                          <div className="price inline">
                            <p className="card-price">{product.price}</p>
                            <h1 className="card-currncy">SAR</h1>
                          </div>
                          <p className="vat">Inclusive of VAT</p>
                        </div>
                      </div>
                    </div>
                  ))}
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
