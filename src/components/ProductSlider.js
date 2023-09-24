import React from 'react';

// Product Slider Component (Reusable)
const ProductSlider = ({ title }) => {
  return (
    // HTML content related to the Product Slider
    <div className="gray">
      <div className="products-category">
        <div className="container">
          <div className="row">
            <div className="Related-Products">
              <div className="splide__track">
                {/* Dynamic title for the slider */}
                <p className="products-category-header" id={title.replace(" ", "-")}>{title}</p>
                <hr className="devider-products-category" />
                <div className="splide__list">
                  {/* Replace the following divs with dynamic product data once it's available */}
                  <div className="col-sm-4 splide__slide m-2">
                    <div className="card text-white">
                      <div className="card-body">
                        <a href="#"><img src="pics/slider.png" alt="product pic" /></a>
                        <p className="card-title">Surface-mounted LED Luminaires</p>
                        <div className="price inline">
                          <p className="card-price">29</p>
                          <h1 className="card-currncy">SAR</h1>
                        </div>
                        <p className="vat">Inclusive of VAT</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4 splide__slide m-2">
                    <div className="card text-white">
                      <div className="card-body">
                        <a href="#"><img src="pics/slider.png" alt="product pic" /></a>
                        <p className="card-title">Surface-mounted LED Luminaires</p>
                        <div className="price inline">
                          <p className="card-price">29</p>
                          <h1 className="card-currncy">SAR</h1>
                        </div>
                        <p className="vat">Inclusive of VAT</p>
                      </div>
                    </div>
                  </div>
                  {/* More products */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSlider;
