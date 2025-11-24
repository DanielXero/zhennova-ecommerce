import React from 'react';
import heroImage from '../assets/hero.jpg';


export const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="bg-dark text-white py-5">
        <div className="container">
          <div className="row align-items-center min-vh-50 py-5">
            <div className="col-lg-6">
              <span className="badge bg-primary mb-3 fs-6">Tecnología de Vanguardia</span>
              <h1 className="display-4 fw-bold mb-4">
                Bienvenido a <span className="text-cyan">ZhenNova</span>
              </h1>
              <p className="lead mb-4 fs-5">
                Tu tienda experta en Hardware y Periféricos. Descubre las mejores ofertas en tecnología 
                con la garantía y calidad que mereces.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <button className="btn btn-zhennova btn-lg px-4 py-2">
                  Ver Productos
                </button>
              </div>
            </div>
            <div className="col-lg-6 text-center img-fluid ">
              <div className=" bg-gradient-primary rounded-3 p-5 ">
                {/* <i className="bi bi-cpu text-cyan opacity-75" style={{ fontSize: '120px' }}></i> */}
                <img src={heroImage} className="img-fluid" alt="Hero image" />
                
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
  );
};