import React, { useEffect, useState } from 'react';
import axios from 'axios'; // import axios for making API requests
import HeaderContentContainer from '../components/HeaderContentContainer';
import ProductDetails from '../components/ProductDetails';
import AvailabilityStock from '../components/AvailabilityStock';
import DescriptionSpecification from '../components/DescriptionSpecification';
import ProductSlider from '../components/ProductSlider';
import Footer from '../components/Footer';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const ProductPage = ({ sku }) => {
  const [productData, setProductData] = useState(null); // state to hold fetched product data

  useEffect(() => {
    // API request configuration
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://staging-ksa-v2.build-station.com/build-station-apis-v2/api/items/vacmaster_dry?category=vacuum',
      headers: { 
        'apikey': 'Ujf4ZHdP3zHrmfsvAETpUmvK7BPS/jU/YKCp+VXaF1A=', 
        'lang': 'en', 
        'currency': 'SAR', 
        'country': 'SA'
      }
    };

    // Make API request and set the response data to productData state
    axios.request(config)
    .then((response) => {
      setProductData(response.data); // set fetched data to state
    })
    .catch((error) => {
      console.log(error); // log error if any
    });
  }, [sku]); // useEffect dependency array, re-run effect if sku changes

  return (
    <div>
      <HeaderContentContainer />
      <h1>Product Page for SKU: {sku}</h1>  
      {/* Pass productData to components that need it */}
      <ProductDetails data={productData} />
      <AvailabilityStock data={productData} />
      <DescriptionSpecification data={productData} />
      <ProductSlider title="Related Products" data={productData} />
      <ProductSlider title="Additions of the Products" data={productData} />
      <ProductSlider title="Cross Selling Products" data={productData} />
      <ProductSlider title="Upselling Products" data={productData} />
      <Footer />
    </div>
  );
};

export default ProductPage;
