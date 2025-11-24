import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/usersSlice'; 
import { useNavigate, Link } from 'react-router-dom';
import { BiLogIn, BiUser, BiLockAlt } from 'react-icons/bi'; 
import { clearError } from '../store/usersSlice';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Obtenemos el estado del slice de usuarios (no uses 'client', usa 'users' si cambiaste el nombre)
  const { isAuth, error, loading } = useSelector((state) => state.users);

  // Redireccionar si ya está logueado
 useEffect(() => {
    // Si se loguea con éxito, redirigir al Home
    if (isAuth) {
      navigate('/');
    }


    return () => {
      dispatch(clearError());
    };
  }, [isAuth, navigate, dispatch]);

  const onSubmit = (data) => {
    // Despachamos la acción de Redux
    dispatch(loginUser(data));
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      {/* Tarjeta Principal */}
      <div className="card shadow-lg border-0 rounded-4 p-4" style={{ maxWidth: '400px', width: '100%', backgroundColor: '#1a1a1a' }}>
        
        {/* Encabezado */}
        <div className="card-body text-center">
          <div className="mb-4">
            <div className="bg-dark d-inline-block p-3 rounded-circle border border-info shadow">
              <BiLogIn size={40} color="#00d2ff" />
            </div>
          </div>
          <h3 className="fw-bold text-white mb-1">Bienvenido</h3>
          <p className="text-secondary small">Ingresa tus credenciales para continuar</p>
        </div>

        {/* Alerta de Error del Backend */}
        {error && (
          <div className="alert alert-danger d-flex align-items-center py-2" role="alert">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            <small>{typeof error === 'string' ? error : 'Error al iniciar sesión'}</small>
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit(onSubmit)}>
          
          {/* Input Email */}
          <div className="mb-3">
            <label className="form-label text-secondary small fw-bold">Email</label>
            <div className="input-group">
              <span className="input-group-text bg-dark border-secondary text-secondary">
                <BiUser />
              </span>
              <input 
                type="email" 
                className={`form-control bg-dark text-white border-secondary ${errors.email ? 'is-invalid' : ''}`}
                placeholder="ejemplo@correo.com"
                {...register("email", { required: "El email es obligatorio" })}
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
                {...register("password", { required: "La contraseña es obligatoria" })}
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
              disabled={loading  === 'loading'} // Deshabilitar si está cargando (chequea si tu slice usa 'loading' o algo similar)
            >
              {loading  === 'loading' ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Ingresando...
                </>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </div>

        </form>

        {/* Footer del Card */}
        <div className="text-center mt-3">
          <p className="text-secondary small mb-0">
            ¿No tienes cuenta? <Link to="/register" className="text-info text-decoration-none fw-bold">Regístrate aquí</Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;