import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../services/api.js';
import { useAuth } from '../store/AuthContext.jsx';

export default function Login() {
  const { login, user } = useAuth();
  const [mode, setMode] = useState('login');
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  async function submit(e) {
    e.preventDefault();
    setMsg(null);
    setLoading(true);
    try {
      if (mode === 'register') {
        await api.register({ nombre, correo, contrasena });
        const data = await api.login({ correo, contrasena });
        login(data);
        navigate(from, { replace: true });
      } else {
        const data = await api.login({ correo, contrasena });
        login(data);
        navigate(from, { replace: true });
      }
    } catch (err) {
      setMsg(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (user) {
    return (
      <div className="container py-4">
        <div className="alert alert-success shadow-sm">
          Ya iniciaste sesión como <b>{user.nombre}</b>.  
          Usa la pestaña <b>Admin</b> si eres administrador.
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-5">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              {/* HEADER */}
              <div className="text-center mb-4">
                <h3 className="fw-bold mb-1">
                  {mode === 'login' ? 'Bienvenido de nuevo' : 'Crear cuenta'}
                </h3>
                <p className="text-muted mb-0">
                  {mode === 'login'
                    ? 'Accede para continuar'
                    : 'Regístrate para comenzar'}
                </p>
              </div>

              {/* TOGGLE */}
              <div className="d-flex justify-content-center mb-3">
                <div className="btn-group btn-group-sm">
                  <button
                    type="button"
                    className={`btn ${
                      mode === 'login'
                        ? 'btn-success'
                        : 'btn-outline-success'
                    }`}
                    onClick={() => setMode('login')}
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    className={`btn ${
                      mode === 'register'
                        ? 'btn-success'
                        : 'btn-outline-success'
                    }`}
                    onClick={() => setMode('register')}
                  >
                    Registro
                  </button>
                </div>
              </div>

              {/* ERROR */}
              {msg && (
                <div className="alert alert-danger small">{msg}</div>
              )}

              {/* FORM */}
              <form className="d-grid gap-3" onSubmit={submit}>
                {mode === 'register' && (
                  <div>
                    <label className="form-label">Nombre</label>
                    <input
                      className="form-control"
                      placeholder="Tu nombre"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      required
                    />
                  </div>
                )}

                <div>
                  <label className="form-label">Correo electrónico</label>
                  <input
                    className="form-control"
                    placeholder="correo@ejemplo.com"
                    type="email"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="form-label">Contraseña</label>
                  <input
                    className="form-control"
                    placeholder="••••••••"
                    type="password"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                    required
                  />
                </div>

                <button
                  className="btn btn-success fw-bold py-2"
                  type="submit"
                  disabled={loading}
                >
                  {loading
                    ? 'Procesando…'
                    : mode === 'login'
                    ? 'Entrar'
                    : 'Registrarme'}
                </button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
