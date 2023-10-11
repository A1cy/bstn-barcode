import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Image from 'next/image';

export default function ProductDetail() {
   const router = useRouter();
   const { sku } = router.query;
   const [productDetail, setProductDetail] = useState(null);
   const [error, setError] = useState(null);
 
   useEffect(() => {
     if (sku) {
       // Fetch product details with the provided SKU
       axios.post('/api/get-product', { sku })
         .then(response => {
           if (response.data && response.data.slug && response.data.category) {
             return axios.get(`/api/get-product-detail?slug=${response.data.slug}&category=${response.data.category}`);
           } else {
             throw new Error('Product not found');
           }
         })
         .then(detailResponse => {
           setProductDetail(detailResponse.data);
         })
         .catch(err => {
           console.error(err);
           setError('Failed to fetch product details');
         });
     }
   }, [sku]);  // Re-run effect when SKU changes
 
   if (error) return <p>{error}</p>;
   if (!productDetail) return <p>Loading...</p>;
 
   return (
     <div>
       {/* Render product details here */}
       <h1>{productDetail.item.title}</h1>
       <Image src={productDetail.item.image} alt={productDetail.item.title} width={150} height={150} />
       {/* Render other product details... */}
     </div>
   );
}
