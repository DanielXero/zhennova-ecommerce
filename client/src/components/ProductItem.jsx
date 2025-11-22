import React from 'react';


export const ProductItem = ({ product }) => {
  return (
    <section className="product-card" style={{ border: '1px solid #ddd', padding: '10px', margin: '10px', width: '250px' }}>
      <img 
        src={product.image} 
        alt={product.title} 
        style={{ width: '100px', height: '100px', objectFit: 'contain' }} 
      />
      <h4>{product.title}</h4>
      <p style={{ fontWeight: 'bold' }}>${product.price}</p>
      {/* Aquí podrías agregar un botón "Ver detalles" en el futuro */}
      <button>Agregar al carrito</button>
    </section>
  );
};