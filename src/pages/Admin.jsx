import React, { useEffect, useMemo, useState } from 'react';
import { api } from '../services/api.js';
import { useAuth } from '../store/AuthContext.jsx';

function normalizeNumber(v) {
  if (v === '' || v == null) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

export default function Admin() {
  const { token } = useAuth();
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState(null);

  const [idEdit, setIdEdit] = useState(null);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [urlImagen, setUrlImagen] = useState('');
  const [latitud, setLatitud] = useState('');
  const [longitud, setLongitud] = useState('');
  const [search, setSearch] = useState('');

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

  function resetForm() {
    setIdEdit(null);
    setNombre('');
    setDescripcion('');
    setUrlImagen('');
    setLatitud('');
    setLongitud('');
  }

  function startEdit(p) {
    setIdEdit(p._id);
    setNombre(p.nombre || '');
    setDescripcion(p.descripcion || '');
    setUrlImagen(p.urlImagen || '');
    setLatitud(p.ubicacion?.latitud ?? '');
    setLongitud(p.ubicacion?.longitud ?? '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function save(e) {
    e.preventDefault();
    setMsg(null);
    setError(null);

    const payload = {
      nombre,
      descripcion,
      urlImagen: urlImagen || undefined,
      ubicacion: {
        latitud: normalizeNumber(latitud),
        longitud: normalizeNumber(longitud),
      },
    };

    try {
      if (idEdit) {
        await api.updatePlace(idEdit, payload, token);
        setMsg('Lugar actualizado ✅');
      } else {
        await api.createPlace(payload, token);
        setMsg('Lugar creado ✅');
      }
      resetForm();
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function remove(id) {
    if (!confirm('¿Eliminar este lugar?')) return;
    setMsg(null);
    setError(null);
    try {
      await api.deletePlace(id, token);
      setMsg('Lugar eliminado ✅');
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    if (!s) return places;
    return places.filter((p) =>
      `${p.nombre} ${p.descripcion}`.toLowerCase().includes(s)
    );
  }, [places, search]);

  return (
    <div className="container py-3 d-grid gap-4">
      {/* ================= HEADER ================= */}
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h3 className="fw-bold mb-0">Panel de Administración</h3>
          <small className="text-muted">
            Gestión de lugares turísticos
          </small>
        </div>
      </div>

      {msg && <div className="alert alert-success">{msg}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* ================= FORM CARD ================= */}
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold mb-0">
              {idEdit ? 'Editar lugar' : 'Nuevo lugar'}
            </h5>

            {idEdit && (
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={resetForm}
                type="button"
              >
                Cancelar edición
              </button>
            )}
          </div>

          <form onSubmit={save} className="row g-3">
            <div className="col-12 col-lg-6">
              <label className="form-label">Nombre</label>
              <input
                className="form-control"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>

            <div className="col-12 col-lg-6">
              <label className="form-label">URL de imagen</label>
              <input
                className="form-control"
                value={urlImagen}
                onChange={(e) => setUrlImagen(e.target.value)}
                placeholder="https://..."
              />
            </div>

            <div className="col-12">
              <label className="form-label">Descripción</label>
              <textarea
                className="form-control"
                rows={4}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                required
              />
            </div>

            <div className="col-6 col-lg-3">
              <label className="form-label">Latitud</label>
              <input
                className="form-control"
                value={latitud}
                onChange={(e) => setLatitud(e.target.value)}
                placeholder="19.123"
              />
            </div>

            <div className="col-6 col-lg-3">
              <label className="form-label">Longitud</label>
              <input
                className="form-control"
                value={longitud}
                onChange={(e) => setLongitud(e.target.value)}
                placeholder="-97.123"
              />
            </div>

            <div className="col-12 col-lg-6 d-flex align-items-end">
              <button className="btn btn-success w-100 fw-bold" type="submit">
                {idEdit ? 'Guardar cambios' : 'Crear lugar'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ================= LISTADO ================= */}
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <div className="d-flex flex-wrap gap-2 justify-content-between align-items-center mb-3">
            <h5 className="fw-bold mb-0">Listado de lugares</h5>

            <div className="d-flex gap-2">
              <input
                className="form-control"
                style={{ width: 260 }}
                placeholder="Buscar..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="btn btn-outline-secondary"
                onClick={load}
                type="button"
              >
                Recargar
              </button>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table align-middle">
              <thead className="table-light">
                <tr>
                  <th>Nombre</th>
                  <th style={{ width: '45%' }}>Descripción</th>
                  <th>Ubicación</th>
                  <th className="text-end" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => {
                  const loc =
                    p.ubicacion?.latitud != null &&
                    p.ubicacion?.longitud != null
                      ? `${p.ubicacion.latitud}, ${p.ubicacion.longitud}`
                      : '—';

                  return (
                    <tr key={p._id}>
                      <td className="fw-semibold">{p.nombre}</td>
                      <td className="text-muted" style={{ whiteSpace: 'pre-wrap' }}>
                        {p.descripcion}
                      </td>
                      <td className="text-muted small">{loc}</td>
                      <td className="text-end">
                        <div className="btn-group btn-group-sm">
                          <button
                            className="btn btn-outline-primary"
                            onClick={() => startEdit(p)}
                            type="button"
                          >
                            Editar
                          </button>
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => remove(p._id)}
                            type="button"
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
