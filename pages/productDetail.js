import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import HeaderContentContainer from '../components/HeaderContentContainer';
import ProductDetail from '../components/ProductDetail';
import AvailabilityStock from '../components/AvailabilityStock';
import DescriptionSpecification from '../components/DescriptionSpecification';
import ProductSlider from '../components/ProductSlider';
import Footer from '../components/Footer';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function ProductDetailPage() {
   const router = useRouter();
   const { sku } = router.query;
   const [productData, setProductData] = useState(null);
   const [error, setError] = useState(null);
 
   useEffect(() => {
     if (sku) {
       axios.post('/api/get-product', { sku })
         .then(response => {
           if (response.data && response.data.slug && response.data.category) {
             return axios.get(`/api/get-product-detail?slug=${response.data.slug}&category=${response.data.category}`);
           } else {
             throw new Error('Product not found');
           }
         })
         .then(detailResponse => {
           setProductData(detailResponse.data);
         })
         .catch(err => {
           console.error(err);
           setError('Failed to fetch product details');
         });
     }
   }, [sku]);

   if (error) return <p>{error}</p>;
   if (!productData) return <p>Loading...</p>;
 
   return (
    <div>
      {/* <HeaderContentContainer /> */}
      {/* <h1>Product Page for SKU: {sku}</h1>   */}
      <ProductDetail data={productData} />
      <AvailabilityStock data={productData} />
      <DescriptionSpecification data={productData} />
      <ProductSlider title="Related Products" data={productData.relatedProducts} />
      <Footer />
    </div>
  );
}
