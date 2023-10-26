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
   const [relatedProducts, setRelatedProducts] = useState([]);
   const [uuid, setUUID] = useState(null); // Define a state to store uuid
   const [error, setError] = useState(null);
 
   useEffect(() => {
     if (sku) {
       axios.post('/api/get-product', { sku })
         .then(response => {
          const { slug, category, uuid } = response.data;
          setUUID(uuid);  // Store the uuid in the state
           if (response.data && response.data.slug && response.data.category) {
             return axios.get(`/api/get-product-detail?slug=${response.data.slug}&category=${response.data.category}`);
           } else {
             throw new Error('Product not found');
           }
         })
         .then(detailResponse => {
           setProductData(detailResponse.data);

           // Fetch related products once we have the product data
           if (detailResponse.data && detailResponse.data.uuid) {
             return axios.get(`/api/get-related-products?uuid=${detailResponse.data.uuid}`);
           }
         })
         .then(relatedResponse => {
           if (relatedResponse && relatedResponse.data) {
             setRelatedProducts(relatedResponse.data);
           }
         })
         .catch(err => {
           console.error(err);
           setError('Failed to fetch product details');
         });
     }
   }, [sku]);

   useEffect(() => {
    if (productData && productData.uuid) {
      // Fetch related products using the product UUID
      axios.get(`/api/get-related-product?uuid=${productData.uuid}`)
        .then(response => {
          setRelatedProducts(response.data.data || []);
        })
        .catch(error => {
          console.error("Error fetching related products:", error);
        });
    }
  }, [productData]);

   if (error) return <p>{error}</p>;
   if (!productData) return <p>Loading...</p>;
   
   return (
    <div>
       <HeaderContentContainer /> 
      {/* <h1>Product Page for SKU: {sku}</h1>   */}
      <div className="header-content-container"> 
      <ProductDetail data={productData} />
      <AvailabilityStock data={productData} />
      <DescriptionSpecification data={productData} />
      </div>
      <ProductSlider title="Related Products" uuid={uuid} />  
      <ProductSlider title="Cross Selling Products" uuid={uuid} />  
      <Footer />
    </div>
  );
}
