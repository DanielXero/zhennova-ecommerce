// zhennova-ecommerce-client/src/pages/Contact.jsx
import React from 'react';

export const Contact = () => {
  return (
    <div className="container my-5 py-5 min-vh-75">
      <h2 className="text-center display-5 fw-bold text-white mb-5">
        Contacta a <span className="text-cyan">ZhenNova</span>
      </h2>
      
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card bg-light-dark text-white p-4 shadow-lg border border-secondary">
            <h5 className="mb-4 fw-bold text-cyan">Envíanos un Mensaje</h5>
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label small text-secondary">Nombre</label>
                <input type="text" className="form-control bg-dark text-white border-secondary" id="name" required />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label small text-secondary">Email</label>
                <input type="email" className="form-control bg-dark text-white border-secondary" id="email" required />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="form-label small text-secondary">Mensaje</label>
                <textarea className="form-control bg-dark text-white border-secondary" id="message" rows="4" required></textarea>
              </div>
              <button type="submit" className="btn btn-zhennova w-100">
                <i className="bi bi-send-fill me-2"></i> Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};