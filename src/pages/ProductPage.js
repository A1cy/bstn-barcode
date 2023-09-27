import React from 'react';
import HeaderContentContainer from '../components/HeaderContentContainer';
import ProductDetails from '../components/ProductDetails';
import AvailabilityStock from '../components/AvailabilityStock';
import DescriptionSpecification from '../components/DescriptionSpecification';
import ProductSlider from '../components/ProductSlider';
import Footer from '../components/Footer';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const ProductPage = ({ sku }) => {
  return (
    <div>
      <HeaderContentContainer />
      <h1>Product Page for SKU: {sku}</h1>
      <ProductDetails />
      <AvailabilityStock />
      <DescriptionSpecification />
      <ProductSlider title="Related Products" />
      <ProductSlider title="Additions of the Products" />
      <ProductSlider title="Cross Selling Products" />
      <ProductSlider title="Upselling Products" />
      <Footer />
    </div>
  );
};

export default ProductPage;

