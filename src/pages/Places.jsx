import React, { useEffect, useMemo, useState } from "react";
import { api } from "../services/api.js";
import "./Places.css";
import { useAuth } from "../store/AuthContext.jsx";

function PlaceCard({ place, onOpen }) {
  const loc =
    place?.ubicacion?.latitud != null && place?.ubicacion?.longitud != null
      ? `${place.ubicacion.latitud}, ${place.ubicacion.longitud}`
      : null;
  return (
    <div className="col">
      <div className="card h-100 shadow-sm">
        {place.urlImagen ? (
          <img
            src={place.urlImagen}
            alt={place.nombre}
            className="card-img-top"
            style={{ height: 180, objectFit: "cover" }}
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        ) : null}
        <div className="card-body">
          <h5 className="card-title mb-1">{place.nombre}</h5>
          <div className="text-muted" style={{ fontSize: 13 }}>
            {loc || "Sin ubicación"}
          </div>
          <p className="card-text mt-2" style={{ whiteSpace: "pre-wrap" }}>
            {place.descripcion}
          </p>
        </div>
        <div className="card-footer bg-body">
          <button
            className="btn btn-primary w-100"
            onClick={() => onOpen(place)}
          >
            Ver detalles y comentarios
          </button>
        </div>
      </div>
    </div>
  );
}

function PlaceModal({ place, onClose }) {
  const { user, token } = useAuth();
  const loc =
    place?.ubicacion?.latitud != null && place?.ubicacion?.longitud != null
      ? `${place.ubicacion.latitud}, ${place.ubicacion.longitud}`
      : null;

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [nombreAutor, setNombreAutor] = useState("");
  const [msg, setMsg] = useState(null);

  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  async function loadComments() {
    setLoading(true);
    try {
      const data = await api.getCommentsByPlace(place._id);
      setComments(Array.isArray(data) ? data : []);
    } catch (e) {
      setMsg(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (place?._id) loadComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [place?._id]);

  // ✅ Evita que el body haga scroll mientras el modal está abierto
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // ✅ Cerrar con ESC
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function submit(e) {
    e.preventDefault();
    setMsg(null);
    try {
      if (user && token) {
        await api.createCommentAsUser(
          { idLugar: place._id, texto: text },
          token
        );
      } else {
        await api.createCommentPublic({
          idLugar: place._id,
          texto: text,
          nombreAutor,
        });
      }
      setText("");
      setNombreAutor("");
      await loadComments();
      setMsg("Comentario enviado ✅");
    } catch (err) {
      setMsg(err.message);
    }
  }
  const isAdmin = user?.rol === "admin";

  function canModifyComment(c) {
    // Debe estar logueado para editar/eliminar
    if (!user || !token) return false;

    // Admin puede todo
    if (isAdmin) return true;

    // Si es comentario público (sin usuario), no se deja a usuario normal
    if (!c?.usuario?._id) return false;

    const myId = String(user.id || user._id);
    return String(c.usuario._id) === myId;
  }

  function startEdit(c) {
    setEditingId(c._id);
    setEditingText(c.texto || "");
    setMsg(null);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditingText("");
  }

  async function saveEdit(id) {
    setMsg(null);
    try {
      await api.updateComment(id, { texto: editingText }, token);
      cancelEdit();
      await loadComments();
      setMsg("Comentario actualizado ✅");
    } catch (e) {
      setMsg(e.message);
    }
  }

  async function removeComment(id) {
    if (!confirm("¿Eliminar este comentario?")) return;
    setMsg(null);
    try {
      await api.deleteComment(id, token);
      if (editingId === id) cancelEdit();
      await loadComments();
      setMsg("Comentario eliminado ✅");
    } catch (e) {
      setMsg(e.message);
    }
  }

  return (
    <div
      className="vt-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="vt-modal" onClick={(e) => e.stopPropagation()}>
        <div className="vt-modal-header">
          <div>
            <h5 className="m-0">{place.nombre}</h5>
            <div className="text-muted" style={{ fontSize: 13 }}>
              {loc || "Sin ubicación"}
            </div>
          </div>

          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>

        <div className="vt-modal-body">
          {place.urlImagen ? (
            <img
              src={place.urlImagen}
              alt={place.nombre}
              className="vt-modal-img"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          ) : null}

          <p className="mt-3" style={{ whiteSpace: "pre-wrap" }}>
            {place.descripcion}
          </p>

          <hr />

          <div className="d-flex align-items-center justify-content-between">
            <h6 className="mb-0">Comentarios</h6>
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={loadComments}
              disabled={loading}
            >
              {loading ? "Cargando..." : "Refrescar"}
            </button>
          </div>

          {msg ? <div className="alert alert-info mt-3 mb-0">{msg}</div> : null}

          <div className="mt-3">
            {loading ? (
              <div className="text-muted">Cargando...</div>
            ) : comments.length ? (
              <ul className="list-group">
                {comments.map((c) => {
                  const canModify = canModifyComment(c);
                  const author =
                    c?.usuario?.nombre || c.nombreAutor || "Usuario";

                  return (
                    <li key={c._id} className="list-group-item">
                      <div className="d-flex justify-content-between align-items-start gap-2">
                        <div>
                          <div className="fw-semibold">{author}</div>
                          <div className="text-muted" style={{ fontSize: 12 }}>
                            {c.createdAt
                              ? new Date(c.createdAt).toLocaleString()
                              : ""}
                          </div>
                        </div>

                        {canModify ? (
                          <div className="d-flex gap-2">
                            {editingId !== c._id ? (
                              <button
                                className="btn btn-sm btn-outline-primary"
                                type="button"
                                onClick={() => startEdit(c)}
                              >
                                Editar
                              </button>
                            ) : null}

                            <button
                              className="btn btn-sm btn-outline-danger"
                              type="button"
                              onClick={() => removeComment(c._id)}
                            >
                              Eliminar
                            </button>
                          </div>
                        ) : null}
                      </div>

                      {editingId === c._id ? (
                        <div className="mt-2 d-grid gap-2">
                          <textarea
                            className="form-control"
                            rows={3}
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
                          />
                          <div className="d-flex gap-2">
                            <button
                              className="btn btn-sm btn-success"
                              type="button"
                              onClick={() => saveEdit(c._id)}
                              disabled={!editingText.trim()}
                            >
                              Guardar
                            </button>
                            <button
                              className="btn btn-sm btn-outline-secondary"
                              type="button"
                              onClick={cancelEdit}
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div style={{ whiteSpace: "pre-wrap" }}>{c.texto}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="text-muted">Aún no hay comentarios.</div>
            )}
          </div>

          <hr />

          <h6>Deja un comentario</h6>
          <form onSubmit={submit} className="d-grid gap-2">
            {!user ? (
              <input
                className="form-control"
                placeholder="Tu nombre (opcional)"
                value={nombreAutor}
                onChange={(e) => setNombreAutor(e.target.value)}
              />
            ) : (
              <div className="text-muted" style={{ fontSize: 13 }}>
                Publicando como <b>{user.nombre}</b>
              </div>
            )}

            <textarea
              className="form-control"
              rows={3}
              placeholder="Escribe tu comentario..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />

            <button className="btn btn-success" type="submit">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function Places() {
  const [places, setPlaces] = useState([]);
  const [q, setQ] = useState("");
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);

  async function load() {
    setError(null);
    try {
      const data = await api.getPlaces();
      setPlaces(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return places;
    return places.filter((p) => {
      const hay = `${p.nombre || ""} ${p.descripcion || ""} ${
        p.ubicacion || ""
      }`.toLowerCase();
      return hay.includes(s);
    });
  }, [places, q]);

  return (
    <div className="d-grid gap-3">
      <div className="d-flex flex-wrap gap-2 align-items-center justify-content-between">
        <h3 className="mb-0">Lugares</h3>
        <button className="btn btn-outline-secondary" onClick={load}>
          Recargar
        </button>
      </div>

      <input
        className="form-control"
        placeholder="Buscar por nombre, descripción o ubicación..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      {error ? <div className="alert alert-danger">{error}</div> : null}

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
        {filtered.map((p) => (
          <PlaceCard key={p._id} place={p} onOpen={setSelected} />
        ))}
      </div>

      {selected ? (
        <PlaceModal place={selected} onClose={() => setSelected(null)} />
      ) : null}
    </div>
  );
}
