import React from 'react';
import { ProductItem } from './ProductItem';

export const ProductList = ({ products }) => {
  return (
    <section className="product-list-container">
      <h3>Catálogo de Hardware</h3>      
      {products.length === 0 ? (
        <p>Cargando productos...</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};