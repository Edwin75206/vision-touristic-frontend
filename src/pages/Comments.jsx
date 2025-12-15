import React, { useEffect, useMemo, useState } from 'react';
import { api } from '../services/api.js';
import { useAuth } from '../store/AuthContext.jsx';
import "./Comments.css";

export default function Comments() {
  const { user, token } = useAuth();
  const [places, setPlaces] = useState([]);
  const [placeId, setPlaceId] = useState('');
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [texto, setTexto] = useState('');
  const [nombreAutor, setNombreAutor] = useState('');
  const [msg, setMsg] = useState(null);

  // ✅ NUEVO (editar inline)
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  useEffect(() => {
    api.getPlaces()
      .then((data) => {
        const arr = Array.isArray(data) ? data : [];
        setPlaces(arr);
        if (!placeId && arr[0]?._id) setPlaceId(arr[0]._id);
      })
      .catch((e) => setMsg(e.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedPlace = useMemo(() => places.find((p) => p._id === placeId), [places, placeId]);

  async function loadComments(id) {
    if (!id) return;
    setLoading(true);
    setMsg(null);
    try {
      const data = await api.getCommentsByPlace(id);
      setComments(Array.isArray(data) ? data : []);
    } catch (e) {
      setMsg(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (placeId) loadComments(placeId);
  }, [placeId]);

  async function submit(e) {
    e.preventDefault();
    setMsg(null);
    try {
      if (user && token) {
        await api.createCommentAsUser({ idLugar: placeId, texto }, token);
      } else {
        await api.createCommentPublic({ idLugar: placeId, texto, nombreAutor });
      }
      setTexto('');
      setNombreAutor('');
      await loadComments(placeId);
      setMsg('Comentario enviado ✅');
    } catch (err) {
      setMsg(err.message);
    }
  }

  // ✅ NUEVO: permisos (admin o dueño)
  const isAdmin = user?.rol === 'admin';

  function canModifyComment(c) {
    if (!user || !token) return false;
    if (isAdmin) return true;

    // si el comentario es público (sin usuario), no se deja editar/eliminar
    if (!c?.usuario?._id) return false;

    const uid = String(c.usuario._id);
    const myId = String(user.id || user._id); // por si tu auth usa _id
    return uid === myId;
  }

  // ✅ NUEVO: iniciar edición
  function startEdit(c) {
    setEditingId(c._id);
    setEditingText(c.texto || '');
    setMsg(null);
  }

  // ✅ NUEVO: cancelar edición
  function cancelEdit() {
    setEditingId(null);
    setEditingText('');
  }

  // ✅ NUEVO: guardar edición
  async function saveEdit(id) {
    setMsg(null);
    try {
      await api.updateComment(id, { texto: editingText }, token);
      cancelEdit();
      await loadComments(placeId);
      setMsg('Comentario actualizado ✅');
    } catch (e) {
      setMsg(e.message);
    }
  }

  // ✅ NUEVO: eliminar
  async function removeComment(id) {
    if (!confirm('¿Eliminar este comentario?')) return;
    setMsg(null);
    try {
      await api.deleteComment(id, token);
      if (editingId === id) cancelEdit();
      await loadComments(placeId);
      setMsg('Comentario eliminado ✅');
    } catch (e) {
      setMsg(e.message);
    }
  }

  return (
    <div className="d-grid gap-3">
      <div className="d-flex flex-wrap gap-2 align-items-center justify-content-between">
        <h3 className="mb-0">Comentarios</h3>
        <button className="btn btn-outline-secondary" onClick={() => loadComments(placeId)} disabled={loading || !placeId}>
          Refrescar
        </button>
      </div>

      <div className="row g-2">
        <div className="col-12 col-lg-6">
          <label className="form-label">Lugar</label>
          <select className="form-select" value={placeId} onChange={(e) => setPlaceId(e.target.value)}>
            {places.map((p) => (
              <option key={p._id} value={p._id}>
                {p.nombre}
              </option>
            ))}
          </select>
          {selectedPlace ? (
            <div className="text-muted mt-2" style={{ fontSize: 13, whiteSpace: 'pre-wrap' }}>
              {selectedPlace.descripcion}
            </div>
          ) : null}
        </div>

        <div className="col-12 col-lg-6">
          <label className="form-label">Deja tu comentario</label>
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
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              required
            />

            <button className="btn btn-success" type="submit" disabled={!placeId}>
              Enviar
            </button>

          </form>
        </div>
      </div>

      {msg ? <div className="alert alert-info">{msg}</div> : null}

      <div>
        {loading ? (
          <div className="text-muted">Cargando...</div>
        ) : comments.length ? (
          <div className="list-group">
            {comments.map((c) => {
              const canModify = canModifyComment(c);
              const author = c?.usuario?.nombre || c.nombreAutor || 'Usuario';

              return (
                <div key={c._id} className="list-group-item">
                  <div className="d-flex justify-content-between align-items-start gap-2">
                    <div>
                      <div className="fw-semibold">{author}</div>
                      <div className="text-muted" style={{ fontSize: 12 }}>
                        {c.createdAt ? new Date(c.createdAt).toLocaleString() : ''}
                      </div>
                    </div>

                    {canModify ? (
                      <div className="d-flex gap-2">
                        {editingId === c._id ? null : (
                          <button className="btn btn-sm btn-outline-primary" onClick={() => startEdit(c)} type="button">
                            Editar
                          </button>
                        )}
                        <button className="btn btn-sm btn-outline-danger" onClick={() => removeComment(c._id)} type="button">
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
                        <button className="btn btn-sm btn-outline-secondary" type="button" onClick={cancelEdit}>
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div style={{ whiteSpace: 'pre-wrap' }}>{c.texto}</div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-muted">No hay comentarios para este lugar.</div>
        )}
      </div>
    </div>
  );
}
