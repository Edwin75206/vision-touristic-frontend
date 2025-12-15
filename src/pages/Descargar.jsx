import React from "react";
import "./Descargar.css";

// ✅ importa las imágenes (Vite las mete al build)
import imgVision from "../img/VSTouristicMS1.jpg";
import imgCruz from "../img/VRCruzXico.jpg";

export default function Descargar() {
  const APP_URL = "https://profound-queijadas-e58a54.netlify.app";

  return (
    <section className="descargar-section">
      {/* ===== TÍTULO ===== */}
      <header className="descargar-header">
        <h2 className="titulo-seccion">Descargar</h2>
        <p className="subtitulo-seccion">
          Conoce Vision Touristic y vive una nueva forma de turismo inclusivo
        </p>
      </header>

      {/* ===== BLOQUE 1 ===== */}
      <div className="descargar-card">
        <div className="descargar-img">
          <img src={imgVision} alt="Vision Touristic" />
        </div>

        <div className="descargar-texto">
          <h3>¿Quiénes son Vision Touristic?</h3>
          <p>
            Vision Touristic es un proyecto enfocado en el turismo inclusivo,
            diseñado para que personas con discapacidad motriz puedan disfrutar
            de experiencias turísticas de una manera diferente, inmersiva y
            accesible.
          </p>
        </div>
      </div>

      {/* ===== BLOQUE 2 ===== */}
      <div className="descargar-info">
        <p>
          Este proyecto nace ante la necesidad de crear nuevas alternativas para
          el turismo accesible, permitiendo que las personas puedan sentirse
          dentro de un lugar sin la necesidad de estar físicamente ahí, gracias
          al uso de Realidad Virtual y Realidad Aumentada.
        </p>

        <p>
          Durante dos años se trabajó en distintas fases para lograr una
          aplicación de alta calidad, permitiendo visitar de forma virtual uno
          de los lugares más emblemáticos de Xicotepec de Juárez: el Mirador de la
          Cruz Celestial.
        </p>
      </div>

      {/* ===== BLOQUE 3 DESCARGA ===== */}
      <div className="descargar-cta">
        <img src={imgCruz} alt="Mirador Cruz Celestial" />

        <div className="cta-texto">
          <h3>Vive la experiencia</h3>
          <p>
            Descarga la aplicación y explora el Mirador de la Cruz Celestial de
            una manera totalmente inmersiva.
          </p>

          <a
            href="https://drive.google.com/file/d/1EBz5S5X9W0id6LTf6xSzxyuVzkF3lCOH/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-descargar"
          >
            Descargar APK
          </a>
        </div>
      </div>

      {/* ===== PREVIEW EMBEBIDO ===== */}
      <div className="iframe-card">
        <div className="iframe-head">
          <div>
            <h3 className="iframe-title">Probar la app (Web)</h3>
            <p className="iframe-subtitle">
              Vista previa interactiva dentro de la página
            </p>
          </div>

          <a
            className="btn-abrir"
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            title="Abrir en una nueva pestaña"
          >
            Abrir en pantalla completa ↗
          </a>
        </div>

        <div className="iframe-wrap">
          <iframe
            src={APP_URL}
            title="Vision Touristic Web App"
            loading="lazy"
            referrerPolicy="no-referrer"
            allow="geolocation; fullscreen"
          />
        </div>

        <p className="iframe-note">
          *Si tu app usa cámara/ubicación, el navegador puede pedir permisos.
        </p>
      </div>
    </section>
  );
}
