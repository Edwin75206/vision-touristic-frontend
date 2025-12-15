import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../store/AuthContext.jsx';

function Tab({ to, children, end }) {
  return (
    <li className="nav-item" role="presentation">
      <NavLink
        to={to}
        end={end}
        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        role="tab"
      >
        {children}
      </NavLink>
    </li>
  );
}

export default function TabsLayout({ children }) {
  const { user, isAdmin, logout } = useAuth();

  return (
    <div>
      <header className="border-bottom bg-body">
        <div className="container py-3 d-flex align-items-center justify-content-between">
          <div>
            <div className="fw-bold">Vision Touristic</div>
            <div className="text-muted" style={{ fontSize: 12 }}>
              PWA • React + Vite + Bootstrap
            </div>
          </div>

          <div className="d-flex align-items-center gap-2">
            {user ? (
              <>
                <span className="badge text-bg-secondary">{user.nombre}</span>
                {isAdmin && <span className="badge text-bg-warning">admin</span>}
                <button className="btn btn-outline-danger btn-sm" onClick={logout}>
                  Cerrar sesión
                </button>
              </>
            ) : (
              <span className="text-muted" style={{ fontSize: 13 }}>
                No has iniciado sesión
              </span>
            )}
          </div>
        </div>

        <div className="container">
          <ul className="nav nav-tabs" role="tablist">
            <Tab to="/" end>
              Landing
            </Tab>
            <Tab to="/lugares">Lugares</Tab>
            <Tab to="/comentarios">Comentarios</Tab>
            <Tab to="/login">Login</Tab>
            {isAdmin && <Tab to="/admin">Admin</Tab>}
          </ul>
        </div>
      </header>

      <main className="container py-4">{children}</main>

      <footer className="border-top">
        <div className="container py-3 text-muted" style={{ fontSize: 13 }}>
          Vision Touristic • Backend: <code>/api/places</code>, <code>/api/comments</code>, <code>/api/auth</code>
        </div>
      </footer>
    </div>
  );
}
