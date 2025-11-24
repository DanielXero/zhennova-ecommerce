import React from 'react';
import heroImage from '../assets/hero.jpg';
import heroAuros from '../assets/hero_auros.jpg'; 
import MonitorLG from '../assets/monitoresLG.jpg'; // Usaremos esta como tercera imagen
import { Link } from 'react-router-dom'; 

export const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="bg-dark text-white py-5">
        <div className="container">
          {/* CLAVE RESPONSIVE:
            1. flex-column-reverse: En móviles (por defecto), la columna va en orden inverso (imagen, luego texto).
            2. flex-lg-row: A partir de pantallas grandes (lg), el orden vuelve a ser el normal (texto, luego imagen).
          */}
          <div className="row align-items-center min-vh-50 py-5 flex-column-reverse flex-lg-row"> 
            
            <div className="col-lg-6 mt-4 mt-lg-0"> 
              <span className="badge bg-primary mb-3 fs-6">Tecnología de Vanguardia</span>
              <h1 className="display-4 fw-bold mb-4">
                Bienvenido a <span className="text-cyan">ZhenNova</span>
              </h1>
              <p className="lead mb-4 fs-5">
                Tu tienda experta en Hardware y Periféricos. Descubre las mejores ofertas en tecnología
                con la garantía y calidad que mereces.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Link to="/productos" className="btn btn-zhennova btn-lg px-4 py-2">
                  Ver Productos
                </Link>
              </div>
            </div>
            
            <div className="col-lg-6 text-center">
              {/* AJUSTE DE PADDING:
                p-3: Padding pequeño en todos los tamaños (para móviles).
                p-lg-5: Padding grande solo en pantallas grandes (lg).
              */}
              <div className="bg-gradient-primary rounded-3 p-2 p-lg-2"> 

                {/* INICIO DEL COMPONENTE CARRUSEL (ADAPTADO A JSX) */}
                <div 
                    id="carouselExampleAutoplaying" 
                    className="carousel slide" 
                    data-bs-ride="carousel"
                    // Estilo para controlar la altura del carrusel
                    style={{ maxHeight: '450px', overflow: 'hidden' }}
                >
                    <div className="carousel-inner rounded-3">
                        {/* Slide 1 */}
                        <div className="carousel-item active">
                            {/* CLAVE: src="{variable}" y className en lugar de class */}
                            <img 
                                src={heroImage} 
                                className="d-block w-100" 
                                alt="PC Gaming Principal"
                                style={{ objectFit: 'contain', height: '370px' }}
                            />
                        </div>
                        {/* Slide 2 */}
                        <div className="carousel-item">
                            <img 
                                src={heroAuros} 
                                className="d-block w-100" 
                                alt="Componentes Auros"
                                style={{ objectFit: 'contain', height: '370px' }}
                            />
                        </div>
                        {/* Slide 3 */}
                        <div className="carousel-item">
                            <img 
                                src={MonitorLG} 
                                className="d-block w-100" 
                                alt="React/Vite"
                                style={{ objectFit: 'contain', height: '370px' }}
                            />
                        </div>
                    </div>
                    
                    {/* Botón Anterior */}
                    <button 
                        className="carousel-control-prev" 
                        type="button" 
                        data-bs-target="#carouselExampleAutoplaying" 
                        data-bs-slide="prev"
                    >
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Anterior</span>
                    </button>
                    
                    {/* Botón Siguiente */}
                    <button 
                        className="carousel-control-next" 
                        type="button" 
                        data-bs-target="#carouselExampleAutoplaying" 
                        data-bs-slide="next"
                    >
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Siguiente</span>
                    </button>
                </div>
                {/* FIN DEL CARRUSEL */}
              </div>
            </div>
            
          </div>
        </div>
      </section>
      {/* ¡Puedes añadir aquí la sección de Productos Destacados! */}
    </div>
  );
};