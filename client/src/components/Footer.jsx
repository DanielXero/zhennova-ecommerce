import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-3 border-top border-primary">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <h5 className="text-cyan fw-bold mb-3">ZhenNova</h5>
            <p className="text-light">
              Tu tienda de confianza para componentes de PC y periféricos. 
              Ofrecemos la mejor calidad y precios competitivos.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="text-white hover-cyan text-decoration-none">
                <i className="bi bi-facebook fs-5"></i>
              </a>
              <a href="#" className="text-white hover-cyan text-decoration-none">
                <i className="bi bi-twitter fs-5"></i>
              </a>
              <a href="#" className="text-white hover-cyan text-decoration-none">
                <i className="bi bi-instagram fs-5"></i>
              </a>
              <a href="#" className="text-white hover-cyan text-decoration-none">
                <i className="bi bi-whatsapp fs-5"></i>
              </a>
            </div>
          </div>
          
          <div className="col-lg-2 col-md-6">
            <h6 className="fw-bold mb-3 text-cyan">Enlaces Rápidos</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/" className="text-light text-decoration-none hover-cyan">Inicio</a>
              </li>
              <li className="mb-2">
                <a href="/productos" className="text-light text-decoration-none hover-cyan">Productos</a>
              </li>
              
              <li className="mb-2">
                <a href="/nosotros" className="text-light text-decoration-none hover-cyan">Nosotros</a>
              </li>
              <li className="mb-2">
                <a href="/contacto" className="text-light text-decoration-none hover-cyan">Contacto</a>
              </li>
            </ul>
          </div>
          
          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold mb-3 text-cyan">Categorías</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none hover-cyan">Procesadores</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none hover-cyan">Tarjetas Gráficas</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none hover-cyan">Memoria RAM</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none hover-cyan">Almacenamiento</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none hover-cyan">Periféricos</a>
              </li>
            </ul>
          </div>
          
          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold mb-3 text-cyan">Contacto</h6>
            <ul className="list-unstyled text-light">
              <li className="mb-3 d-flex align-items-start">
                <i className="bi bi-geo-alt me-2 text-cyan mt-1"></i>
                <small>Av. Tecnología 123, Ciudad Digital</small>
              </li>
              <li className="mb-3 d-flex align-items-center">
                <i className="bi bi-telephone me-2 text-cyan"></i>
                <small>+1 234 567 890</small>
              </li>
              <li className="mb-3 d-flex align-items-center">
                <i className="bi bi-envelope me-2 text-cyan"></i>
                <small>info@zhennova.com</small>
              </li>
              <li className="mb-2 d-flex align-items-center">
                <i className="bi bi-clock me-2 text-cyan"></i>
                <small>Lun-Vie: 9:00 - 18:00</small>
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="my-4 border-secondary" />
        
        <div className="row">
          <div className="col-md-12 text-center text-md-start">
            <p className="text-light mb-0 text-center">
              &copy; 2025 <span className="text-cyan">ZhenNova</span> - Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};