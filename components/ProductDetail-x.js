// ProductDetail.js

import React from 'react';

const ProductDetail = ({ product }) => {
  return (
    <div className="product">
      <h2>{product.title}</h2>
      <img src={product.image} alt={product.title} />
      <p>Price: {product.price}</p>
      <p className="product-title">{product.title}</p>
      <p className="product-sku">SKU: {product.item_variant_sku}</p>
      <p className={product.sale_price ? 'sale-price' : 'product-price'}>
        Price: {product.sale_price || product.price}
        {product.sale_price && <span className="original-price">{product.price}</span>}
      </p>
      <p className="product-category">Category: {product.item_category_slug}</p>
      {product.discount_amount && <p className="discount">Discount: {product.discount_amount}</p>}
    </div>
  );
};

export default ProductDetail;
