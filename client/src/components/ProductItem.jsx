// zhennova-ecommerce-client/src/components/ProductItem.jsx
import React from 'react';

export const ProductItem = ({ product }) => {
  // Simulación de URL de imagen, usa una real si las tienes en el backend
  const imageUrl = "https://picsum.photos/400/300?random=" + product.id; 

  return (
    <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
      {/* Tarjeta de producto oscura y estilizada */}
      <div className="card h-100 bg-light-dark text-white shadow-sm border border-secondary rounded-3 hover-bg-dark">
        <img 
          src={imageUrl} 
          className="card-img-top p-2 rounded-top-3" 
          alt={product.name} 
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title text-cyan fw-bold mb-1">{product.name}</h5>
          <p className="card-text small text-secondary mb-2 flex-grow-1">
            {product.description || 'Producto de alta calidad para tu setup.'}
          </p>
          <div className="d-flex justify-content-between align-items-center mt-auto">
            <span className="fw-bolder fs-5 text-warning">${product.price}</span>
            <span className={`badge ${product.stock > 0 ? 'bg-success' : 'bg-danger'}`}>
              {product.stock > 0 ? `Stock: ${product.stock}` : 'Agotado'}
            </span>
          </div>
        </div>
        <div className="card-footer bg-transparent border-0 pt-0 pb-3">
          <button 
            className="btn btn-zhennova w-100" 
            disabled={product.stock === 0}
          >
            <i className="bi bi-cart-plus me-2"></i> Añadir al Carrito
          </button>
        </div>
      </div>
    </div>
  );
};