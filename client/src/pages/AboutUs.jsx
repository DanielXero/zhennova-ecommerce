// zhennova-ecommerce-client/src/pages/AboutUs.jsx
import React from 'react';

export const AboutUs = () => {
  return (
    <div className="container my-5 py-5 text-center min-vh-75">
      <h2 className="display-5 fw-bold text-white mb-4">
        Sobre <span className="text-cyan">ZhenNova</span>
      </h2>
      <p className="lead text-secondary mx-auto" style={{ maxWidth: '800px' }}>
        Somos tu socio estratégico en tecnología, ofreciendo componentes de PC y periféricos de última generación. 
        Nuestra misión es potenciar tu experiencia digital con productos de alta calidad y el mejor soporte.
      </p>
      <div className="mt-5">
        <i className="bi bi-cpu fs-1 text-primary"></i>
        <i className="bi bi-gear ms-4 fs-1 text-primary"></i>
      </div>
    </div>
  );
};