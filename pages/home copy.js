import { useState, useEffect } from 'react';
import axios from 'axios';

function Home({ initialProductDetail }) {
  const [sku, setSku] = useState(''); 
  const [productDetail, setProductDetail] = useState(initialProductDetail || {}); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

  const handleSkuInput = (e) => {
    setSku(e.target.value);
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      setError(null); 

      try {
        const response = await axios.post('/api/proxy/build-station-apis-v2/api/items/search-items-ajax', { searchText: sku }, {
          headers: {
            'Content-Type': 'application/json',
            'apikey': 'Ujf4ZHdP3zHrmfsvAETpUmvK7BPS/jU/YKCp+VXaF1A=',
            'lang': 'en',
            'currency': 'SAR',
            'country': 'SA'
          }
        });

        if(response.data && response.data.data && response.data.data.items && response.data.data.items.length > 0) {
          const item = response.data.data.items[0];
          const slug = item.slug;
          const category = item.item_category_slug;

          // Fetch additional product details through the proxy
          const detailsUrl = `/api/proxy/build-station-apis-v2/api/items/${slug}?category=${category}`;

          const detailsResponse = await axios.get(detailsUrl, {
            headers: {
              'Content-Type': 'application/json',
              'apikey': 'Ujf4ZHdP3zHrmfsvAETpUmvK7BPS/jU/YKCp+VXaF1A=',
              'lang': 'en',
              'currency': 'SAR',
              'country': 'SA'
            }
          });

          setProductDetail(detailsResponse.data.data);
        } else {
          setError('No product found'); 
        }
      } catch (error) {
        console.error('Failed to fetch product details:', error);
        setError('Failed to fetch product details'); 
      }

      setLoading(false); 
    };

    if(sku !== '') {
      fetchProductDetails();
    }
  }, [sku]);

  return (
    <div className="container">
    <label className="label">
      Enter SKU:
      <input 
        type="text" 
        value={sku} 
        onChange={handleSkuInput} 
        className="input"
      />
    </label>
    <button onClick={() => setLoading(true)} disabled={loading || sku === ''}>Fetch Product Details</button>
    {loading && <p>Loading...</p>}
    {error && <p className="error">{error}</p>}
    {productDetail.title && !loading && !error && (
      <div className="product-details">
        <h2>Product Details:</h2>
        <img 
          src={productDetail.image} 
          alt={productDetail.title} 
          className="product-image"
        />
        <p className="product-title">{productDetail.title}</p>
        <p className="product-sku">SKU: {productDetail.item_variant_sku}</p>
        <p className={productDetail.sale_price ? 'sale-price' : 'product-price'}>
          Price: {productDetail.sale_price || productDetail.price} 
          {productDetail.sale_price && <span className="original-price">{productDetail.price}</span>}
        </p>
        <p className="product-category">Category: {productDetail.item_category_slug}</p>
        {productDetail.discount_amount && <p className="discount">Discount: {productDetail.discount_amount}</p>}
      </div>
    )}
  </div>
  
  );
}

export default Home;

export async function getServerSideProps(context) {
  let productDetail = {};

  try {
    const response = await axios.post('https://staging-ksa-v2.build-station.com/build-station-apis-v2/api/items/search-items-ajax', { searchText: '' }, {
      headers: {
        'Content-Type': 'application/json',
        'apikey': 'Ujf4ZHdP3zHrmfsvAETpUmvK7BPS/jU/YKCp+VXaF1A=',
        'lang': 'en',
        'currency': 'SAR',
        'country': 'SA'
      }
    });

    if(response.data && response.data.data && response.data.data.items && response.data.data.items.length > 0) {
      productDetail = response.data.data.items[0];
    }
  } catch (error) {
    console.error('Failed to fetch product details during SSR:', error);
  }

  return {
    props: { initialProductDetail: productDetail }
  };
}
