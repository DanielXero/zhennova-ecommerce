import React, { useState } from 'react';

export const Contact = () => {
  // Estado para controlar la visibilidad y el tipo de mensaje
  const [submissionStatus, setSubmissionStatus] = useState(null); // 'success' o 'error'
  const [isSending, setIsSending] = useState(false); // Estado para deshabilitar el botón

  const handleSubmit = (e) => {
    e.preventDefault(); // Detiene la recarga de la página

    // 1. Validaciones básicas de formulario (Bootstrap maneja la mayoría, pero hacemos esto para simular)
    const form = e.target;
    if (!form.checkValidity()) {
        form.classList.add('was-validated'); // Muestra feedback de validación de Bootstrap
        return;
    }

    setIsSending(true);
    setSubmissionStatus(null); // Oculta mensajes anteriores

    // 2. SIMULACIÓN DE ENVÍO ASÍNCRONO
    setTimeout(() => {
      // Aquí iría la lógica real de axios.post('/api/contact', data)

      setIsSending(false);

      // Simular éxito:
      setSubmissionStatus('success');
      
      // Opcional: Limpiar el formulario después del envío exitoso
      form.reset();
      form.classList.remove('was-validated'); 

    }, 2000); // Simula 2 segundos de latencia
  };

  return (
    <div className="container my-5 py-5 min-vh-75">
      <h2 className="text-center display-5 fw-bold text-white mb-5">
        Contacta a <span className="text-cyan">ZhenNova</span>
      </h2>
      
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card bg-light-dark text-white p-4 shadow-lg border border-secondary">
            <h5 className="mb-4 fw-bold text-cyan">Envíanos un Mensaje</h5>

            {/* ZONA DE ALERTA DINÁMICA */}
            {submissionStatus === 'success' && (
                <div className="alert alert-success d-flex align-items-center mb-4" role="alert">
                    <i className="bi bi-check-circle-fill me-2"></i>
                    <div>
                        ¡Mensaje enviado con éxito! Te responderemos pronto.
                    </div>
                </div>
            )}
            {/* Puedes añadir un submissionStatus === 'error' aquí si lo necesitas */}
            
            {/* Formulario */}
            {/* Añadimos onSubmit y la clase needs-validation */}
            <form onSubmit={handleSubmit} noValidate>
              
              {/* Input Nombre (Añadimos required) */}
              <div className="mb-3">
                <label htmlFor="name" className="form-label small text-secondary">Nombre</label>
                <input type="text" className="form-control bg-dark text-white border-secondary" id="name" required />
              </div>
              
              {/* Input Email (Añadimos required) */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label small text-secondary">Email</label>
                <input type="email" className="form-control bg-dark text-white border-secondary" id="email" required />
              </div>
              
              {/* Input Mensaje (Añadimos required) */}
              <div className="mb-4">
                <label htmlFor="message" className="form-label small text-secondary">Mensaje</label>
                <textarea className="form-control bg-dark text-white border-secondary" id="message" rows="4" required></textarea>
              </div>
              
              {/* Botón Submit */}
              <button 
                type="submit" 
                className="btn btn-zhennova w-100"
                disabled={isSending} // Se deshabilita mientras se "envía"
              >
                {isSending ? (
                    <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Enviando...
                    </>
                ) : (
                    <>
                        <i className="bi bi-send-fill me-2"></i> Enviar Mensaje
                    </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};