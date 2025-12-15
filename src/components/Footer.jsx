import React from "react";
import "./Footer.css";

// ✅ importar imagen para Vite build
import logoXico from "../img/LogoXico.png";

export default function Footer() {
  return (
    <footer className="footer">

      {/* Columna izquierda completa */}
      <div className="footer-left">

        {/* Subdivisión: LOGO (50%) + TEXTO (50%) */}
        <div className="footer-left-inner">

          {/* Logo */}
          <div className="footer-logo-box">
            <img
              src={logoXico}
              alt="Logo Xicotepec"
              className="footer-logo"
            />
          </div>

          {/* Texto */}
          <div className="footer-text-box">
            <h3 className="footer-title">Pueblo Mágico</h3>
            <h2 className="footer-subtitle">¿Ya nos visitaste?</h2>

            <p className="footer-text">
              Te invitamos a conocer Xicotepec de Juárez!
            </p>

            <p className="footer-description">
              Disfruta de un entorno completamente natural, lleno de historia y gente.
              Maravíllate con la Sierra Norte del Estado de Puebla.
            </p>
          </div>

        </div>
      </div>

      {/* Separador vertical */}
      <div className="footer-divider"></div>

      {/* Columna derecha */}
      <div className="footer-right">
        <h3 className="footer-emergency-title">Números de Emergencia</h3>

        <ul className="footer-list">
          <li><span>Emergencias</span> <strong>911</strong></li>
          <li><span>CAPUFE</span> <strong>074</strong></li>
          <li><span>Cruz Roja</span> <strong>53 95 11 11</strong></li>
          <li><span>Protección Civil</span> <strong>56 83 22 22</strong></li>
          <li><span>Bomberos</span> <strong>57 68 37 00</strong></li>
        </ul>

        <p className="footer-rights">© 2010 – 2020</p>
        <p className="footer-links">Privacy – Terms</p>
      </div>

    </footer>
  );
}
