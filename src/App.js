import React from 'react';
import HeaderContentContainer from './components/HeaderContentContainer';
import ProductDetails from './components/ProductDetails';
import AvailabilityStock from './components/AvailabilityStock';
import DescriptionSpecification from './components/DescriptionSpecification';
import ProductSlider from './components/ProductSlider';
import Footer from './components/Footer';

const App = () => {
  return (
    <div>
      <HeaderContentContainer />
      <ProductDetails />
      <AvailabilityStock />
      <DescriptionSpecification />
      <ProductSlider title="Related Products" />
      <ProductSlider title="Addions of the Products" />
      <ProductSlider title="Addions of the Products" />
      <ProductSlider title="Addions of the Products" />
      <Footer />
    </div>
  );
};

export default App;
