import React from 'react';


export const NavBar = () => {

  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-primary">
      <div className="container">
       
        <a className="navbar-brand d-flex align-items-center" href="/">
          <span className="text-cyan fw-bold fs-3">ZhenNova</span>

        </a>
        
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse " id="navbarContent">
          {/* Navegación Principal */}
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <a className="nav-link fw-semibold mx-2" href="/">Inicio</a>
            </li>
            
            <li className="nav-item">
              <a className="nav-link fw-semibold mx-2" href="/nosotros">Productos</a>
            </li>

            <li className="nav-item">
              <a className="nav-link fw-semibold mx-2" href="/nosotros">Nosotros</a>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-semibold mx-2" href="/contacto">Contacto</a>
            </li>
          </ul>
          
          {/* Barra de Búsqueda y Acciones */}
          <div className="d-flex align-items-center">
            {/* Barra de Búsqueda */}
            <form className="d-flex me-3 d-none d-lg-flex">
              <div className="input-group">
                <input
                  type="search"
                  className="form-control bg-dark text-white border-end-0"
                  placeholder="Buscar productos..."
                  style={{ minWidth: '250px' }}
                />
                <button className="btn btn-outline-primary border-start-0" type="submit">
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </form>
            
            {/* Acciones de Usuario */}
            <div className="d-flex align-items-center gap-2">
              {/* Icono de Usuario */}
              <button className="btn btn-outline-light position-relative" title="Mi Cuenta">
                <i className="bi bi-person"></i>
              </button>
              
              {/* Icono de Carrito */}
              <button className="btn btn-outline-warning position-relative" title="Carrito de Compras">
                <i className="bi bi-cart"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge bg-danger">
                  0
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}