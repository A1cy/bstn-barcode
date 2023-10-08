import React, { useState } from 'react';
import axios from 'axios';

export default function Home() {
    const [sku, setSku] = useState('');
    const [error, setError] = useState(null);
    const [productDetail, setProductDetail] = useState(null);

    const handleSkuChange = (e) => {
        setSku(e.target.value);
    };

    // Updated handleSearch to use then/catch instead of async/await to prevent rendering promises
    const handleSearch = () => {
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
              if (err.message === 'Product not found' || (err.response && err.response.status === 404)) {
                  setError('Product not found');
              } else {
                  setError('Failed to fetch product');
              }
          });
  };
  

    return (
        <div className="container">
            <input type="text" value={sku} onChange={handleSkuChange} />
            <button onClick={handleSearch}>Search</button>
            {error && <p>{error}</p>}
            {productDetail && productDetail.item && (
    <div>
        <h2>{productDetail.item.title}</h2>
        <img src={productDetail.item.image} alt={productDetail.item.title} /> {/* Make sure the image path is correct */}
        <p>Price: {productDetail.item.price}</p>
    </div>
)}

        </div>
    );
}
