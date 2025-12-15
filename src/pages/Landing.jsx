import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
} from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import CommentIcon from "@mui/icons-material/Comment";
import ExploreIcon from "@mui/icons-material/Explore";
import "./LandingPage.css";
import CentroXicoLand from "../img/CentroXicoLand.png";
import ParroquiaSanJuan from "../img/ParroquiaSanJuan.png";
import ParqueXico from "../img/ParqueXico.jpg";
import CruzCelestial from "../img/CruzCelestial.jpg";
import CatedralXico from "../img/CatedralXico.jpg";
import Xico60s from "../img/Xico60s.jpg";
import Xico60s1 from "../img/Xico60s1.jpg";
import TronoMexico from "../img/TronoMexico.jpg";
import XicoVirgen from "../img/XicoVirgen.jpg";
import VRCruzXico from "../img/VRCruzXico.jpg";

export default function LandingPage() {
  const navigate = useNavigate();

  const gallery = [ParroquiaSanJuan, ParqueXico, CruzCelestial];

  return (
    <div className="lp">
      {/* ================= HERO ================= */}
      <header className="lp-hero">
        <img src={CentroXicoLand} alt="Xicotepec" className="lp-hero-img" />
        <div className="lp-hero-overlay" />
        <Container className="lp-hero-content">
          <Chip
            className="lp-chip"
            icon={<ExploreIcon />}
            label="Pueblo Mágico desde 2012"
          />

          <Typography variant="h3" className="lp-title">
            Xicotepec de Juárez
          </Typography>

          <Typography className="lp-subtitle">
            Si no te gusta el clima, regresa en 20 minutos.
          </Typography>

          <div className="lp-actions">
            <Button
              variant="contained"
              color="secondary"
              size="large"
              startIcon={<PlaceIcon />}
              onClick={() => navigate("/lugares")}
              sx={{ borderRadius: 3, textTransform: "none", fontWeight: 800 }}
            >
              Ver lugares
            </Button>

            <Button
              variant="outlined"
              color="inherit"
              size="large"
              startIcon={<CommentIcon />}
              onClick={() => navigate("/comentarios")}
              sx={{ borderRadius: 3, textTransform: "none", fontWeight: 800 }}
              className="lp-outline"
            >
              Comentarios
            </Button>
          </div>
        </Container>
      </header>

      {/* ================= GALERÍA ================= */}
      <section className="lp-section">
        <Container>
          <Typography variant="h5" className="lp-h2">
            Postales de Xicotepec
          </Typography>
          <Typography className="lp-muted" sx={{ mb: 2 }}>
            Un vistazo rápido a lugares que sí o sí tienes que visitar.
          </Typography>

          <div className="lp-marquee">
            <div className="lp-marquee-track">
              {gallery.concat(gallery).map((src, i) => (
                <img key={i} src={src} alt="" className="lp-gallery-img" />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ================= HISTORIA ================= */}
      <section className="lp-section">
        <Container>
          <Typography variant="h5" className="lp-h2" sx={{ mb: 2 }}>
            ¿Conoces la historia de Xicotepec?
          </Typography>

          <div className="row g-4">
            {/* IZQUIERDA */}
            <div className="col-12 col-lg-5">
              <Card className="lp-card">
                <CardContent>
                  <Typography className="lp-p">
                    Xicotepec tiene aroma a café. Su nombre deriva del náhuatl y
                    significa «Cerro de los Abejorros».
                  </Typography>

                  <div className="lp-img-wrap">
                    <img
                      src={CatedralXico}
                      alt="Historia"
                      className="lp-img-rounded"
                    />
                  </div>

                  <Divider sx={{ my: 2 }} />

                  <Typography className="lp-p">
                    En 1862, cuando estaba por suceder la Batalla de Puebla, un
                    puñado de serranos, al mando de Miguel Negrete, acudió a
                    esta justa victoriosa. A su regreso, decidieron anexar el
                    apellido de Benito Juárez, dando origen al nombre de Villa
                    Juárez.
                  </Typography>
                </CardContent>
              </Card>
            </div>

            {/* DERECHA */}
            <div className="col-12 col-lg-7">
              <Card className="lp-card">
                <CardContent>
                  <Typography className="lp-p">
                    En sus orígenes, este municipio fue habitado por olmecas,
                    otomíes, totonacos, huastecos y nahuas, etnias cuyo
                    misticismo permanece hasta nuestros días.
                  </Typography>

                  <Typography className="lp-p">
                    Ubicado a unos 800 m de altura, posee una temperatura
                    promedio de 19ºC. El clima es cálido húmedo o semicálido y
                    húmedo en medio de la Sierra Madre Oriental.
                  </Typography>

                  <Typography className="lp-p">
                    Disfruta acamayas con salsa macha, molotes, leche quemada y
                    pan de queso; acompáñalo con un espléndido café o licores
                    artesanales.
                  </Typography>

                  <Typography className="lp-p">
                    Xicotepec es productor de café: collares y pulseras con
                    semillas, tejidos de bambú/mimbre y bordados.
                  </Typography>

                  <Chip className="lp-tag" label="Café • Gastronomía • Artesanías" />

                  <div className="lp-row2">
                    <img src={Xico60s} alt="" className="lp-img-rounded" />
                    <img src={Xico60s1} alt="" className="lp-img-rounded" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* ================= EVENTOS ================= */}
      <section className="lp-section">
        <Container>
          <Typography variant="h5" className="lp-h2">
            ¿Sabes qué próximos eventos tendremos?
          </Typography>
          <Typography className="lp-muted" sx={{ mb: 2 }}>
            ¡Tienes que visitarnos en estas fechas!
          </Typography>

          <div className="row g-4">
            <div className="col-12 col-md-6">
              <a className="lp-event" href="https://www.facebook.com/100063531792427/posts/el-trono-de-méxico-llega-a-xicotepec-para-celebrar-el-aniversario-de-pueblo-mági/1419376043523442/" target="_blank">
                <div className="lp-event-imgWrap">
                  <img src={TronoMexico} alt="Evento 1" />
                </div>
                <div className="lp-event-footer">
                  <Typography className="lp-event-title">
                    El Trono de México en Xicotepec
                  </Typography>
                  <span className="lp-event-link">Ver más →</span>
                </div>
              </a>
            </div>

            <div className="col-12 col-md-6">
              <a className="lp-event" href="https://www.facebook.com/WWW.EXPRESION.LIVE/posts/virgen-de-guadalupe-en-xicotepec-pueblahoy-en-la-celebración-de-la-virgen-de-gua/1467081032084416/" target="_blank">
                <div className="lp-event-imgWrap">
                  <img src={XicoVirgen} alt="Evento 2" />
                </div>
                <div className="lp-event-footer">
                  <Typography className="lp-event-title">
                    Día de la Virgen de Guadalupe
                  </Typography>
                  <span className="lp-event-link">Ver más →</span>
                </div>
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* ================= CTA ================= */}
      <section className="lp-cta">
        <Container>
          <div className="row g-4 align-items-center">
            <div className="col-12 col-lg-6">
              <Card className="lp-card lp-ctaCard">
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: 900, mb: 1 }}>
                    ¿Quieres conocer Xicotepec de una forma diferente?
                  </Typography>

                  <Typography className="lp-muted" sx={{ mb: 2 }}>
                    Recorre la Cruz Celestial mediante Realidad Virtual y
                    Realidad Aumentada.
                  </Typography>

                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    sx={{ borderRadius: 3, textTransform: "none", fontWeight: 900 }}
                    onClick={() => navigate("/lugares")}
                  >
                    Probar ahora
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="col-12 col-lg-6">
              <div className="lp-ctaImg">
                <img src={VRCruzXico} alt="" />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
