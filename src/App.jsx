import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import Landing from "./pages/Landing.jsx";
import Places from "./pages/Places.jsx";
import Comments from "./pages/Comments.jsx";
import Login from "./pages/Login.jsx";
import Admin from "./pages/Admin.jsx";
import NotFound from "./pages/NotFound.jsx";

import { useAuth } from "./store/AuthContext.jsx";
import TopNavbarMUI from "./components/TopNavbarMUI.jsx";
import Footer from "./components/Footer.jsx"; 
import Descargar from "./pages/Descargar.jsx";


function RequireAdmin({ children }) {
  const { isAdmin } = useAuth();
  const location = useLocation();
  if (!isAdmin)
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  return children;
}

export default function App() {
  const { user, logout, isAdmin } = useAuth();

  return (
    <div className="app-shell">
      {" "}
      {/* ✅ NUEVO wrapper */}
      <TopNavbarMUI user={user} isAdmin={isAdmin} onLogout={logout} />
      <main className="container py-4 app-content">
        {" "}
        {/* ✅ app-content */}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/lugares" element={<Places />} />
  <Route path="/descargar" element={<Descargar />} />
          <Route
            path="/comentarios"
            element={
              <RequireAdmin>
                <Comments />
              </RequireAdmin>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <RequireAdmin>
                <Admin />
              </RequireAdmin>
            }
          />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </main>
      <Footer /> {/* ✅ NUEVO */}
    </div>
  );
}
