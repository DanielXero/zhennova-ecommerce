import React from 'react';
import  { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearError } from '../store/usersSlice'; // Asegúrate que la ruta sea correcta
import { useNavigate, Link } from 'react-router-dom';
import { BiUserPlus, BiUser, BiEnvelope, BiLockAlt, BiIdCard } from 'react-icons/bi';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Obtenemos estado de carga y errores desde Redux
  const { loading, error, isAuth } = useSelector((state) => state.users);
  useEffect(() => {
    // Si ya está logueado, no debería ver el registro
    if (isAuth) {
      navigate('/');
    }

    // 2. Limpiar errores al desmontar el componente (salir de la página)
    return () => {
      dispatch(clearError());
    };
  }, [isAuth, navigate, dispatch]);

  const onSubmit = async (data) => {
    // Despachamos la acción. Usamos unwait para saber si salió bien y redirigir
    const result = await dispatch(registerUser(data));
    
    if (registerUser.fulfilled.match(result)) {
      // Opcional: Mostrar un toast o alerta bonita
      alert('¡Cuenta creada con éxito! Por favor inicia sesión.');
      navigate('/login');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light py-5">
      {/* Tarjeta Principal */}
      <div className="card shadow-lg border-0 rounded-4 p-4" style={{ maxWidth: '450px', width: '100%', backgroundColor: '#1a1a1a' }}>
        
        {/* Encabezado */}
        <div className="card-body text-center">
          <div className="mb-4">
            <div className="bg-dark d-inline-block p-3 rounded-circle border border-info shadow">
              <BiUserPlus size={40} color="#00d2ff" />
            </div>
          </div>
          <h3 className="fw-bold text-white mb-1">Crear Cuenta</h3>
          <p className="text-secondary small">Únete a ZhenNova hoy mismo</p>
        </div>

        {/* Alerta de Error */}
        {error && (
          <div className="alert alert-danger d-flex align-items-center py-2" role="alert">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            <small>{typeof error === 'string' ? error : 'Error al registrarse'}</small>
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit(onSubmit)}>
          
          {/* Input Nombre Completo */}
          <div className="mb-3">
            <label className="form-label text-secondary small fw-bold">Nombre Completo</label>
            <div className="input-group">
              <span className="input-group-text bg-dark border-secondary text-secondary">
                <BiIdCard />
              </span>
              <input 
                type="text" 
                className={`form-control bg-dark text-white border-secondary ${errors.name ? 'is-invalid' : ''}`}
                placeholder="Juan Perez"
                {...register("name", { required: "El nombre es obligatorio" })}
              />
            </div>
            {errors.name && <span className="text-danger small mt-1">{errors.name.message}</span>}
          </div>

          {/* Input Username */}
          <div className="mb-3">
            <label className="form-label text-secondary small fw-bold">Usuario</label>
            <div className="input-group">
              <span className="input-group-text bg-dark border-secondary text-secondary">
                <BiUser />
              </span>
              <input 
                type="text" 
                className={`form-control bg-dark text-white border-secondary ${errors.username ? 'is-invalid' : ''}`}
                placeholder="juanperez123"
                {...register("username", { required: "El usuario es obligatorio" })}
              />
            </div>
            {errors.username && <span className="text-danger small mt-1">{errors.username.message}</span>}
          </div>

          {/* Input Email */}
          <div className="mb-3">
            <label className="form-label text-secondary small fw-bold">Email</label>
            <div className="input-group">
              <span className="input-group-text bg-dark border-secondary text-secondary">
                <BiEnvelope />
              </span>
              <input 
                type="email" 
                className={`form-control bg-dark text-white border-secondary ${errors.email ? 'is-invalid' : ''}`}
                placeholder="ejemplo@correo.com"
                {...register("email", { 
                  required: "El email es obligatorio",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Formato de email inválido"
                  }
                })}
              />
            </div>
            {errors.email && <span className="text-danger small mt-1">{errors.email.message}</span>}
          </div>

          {/* Input Password */}
          <div className="mb-4">
            <label className="form-label text-secondary small fw-bold">Contraseña</label>
            <div className="input-group">
              <span className="input-group-text bg-dark border-secondary text-secondary">
                <BiLockAlt />
              </span>
              <input 
                type="password" 
                className={`form-control bg-dark text-white border-secondary ${errors.password ? 'is-invalid' : ''}`}
                placeholder="••••••••"
                {...register("password", { 
                  required: "La contraseña es obligatoria",
                  minLength: {
                    value: 6,
                    message: "Mínimo 6 caracteres"
                  }
                })}
              />
            </div>
            {errors.password && <span className="text-danger small mt-1">{errors.password.message}</span>}
          </div>

          {/* Botón Submit */}
          <div className="d-grid mb-3">
            <button 
              type="submit" 
              className="btn btn-info fw-bold text-dark py-2"
              style={{ backgroundColor: '#00d2ff', borderColor: '#00d2ff' }}
              disabled={loading === 'loading'}
            >
              {loading === 'loading' ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Registrando...
                </>
              ) : (
                'Registrarse'
              )}
            </button>
          </div>

        </form>

        {/* Footer del Card */}
        <div className="text-center mt-3">
          <p className="text-secondary small mb-0">
            ¿Ya tienes cuenta? <Link to="/login" className="text-info text-decoration-none fw-bold">Inicia sesión aquí</Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Register;