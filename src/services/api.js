const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000';

async function request(path, { method = 'GET', token, body } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  });

  const contentType = res.headers.get('content-type') || '';
  const data = contentType.includes('application/json') ? await res.json() : await res.text();

  if (!res.ok) {
    const msg = (data && (data.mensaje || data.message)) || `Error ${res.status}`;
    const err = new Error(msg);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}

export const api = {
  ping: () => request('/api/ping'),

  // Auth
  register: (payload) => request('/api/auth/registrar', { method: 'POST', body: payload }),
  login: (payload) => request('/api/auth/login', { method: 'POST', body: payload }),

  // Places
  getPlaces: () => request('/api/places'),
  createPlace: (payload, token) => request('/api/places', { method: 'POST', token, body: payload }),
  updatePlace: (id, payload, token) => request(`/api/places/${id}`, { method: 'PUT', token, body: payload }),
  deletePlace: (id, token) => request(`/api/places/${id}`, { method: 'DELETE', token }),

  // Comments
  getCommentsByPlace: (placeId) => request(`/api/comments/lugar/${placeId}`),
  createCommentPublic: (payload) => request('/api/comments', { method: 'POST', body: payload }),
  createCommentAsUser: (payload, token) => request('/api/comments/yo', { method: 'POST', token, body: payload }),
  getCommentsByPlace: (placeId) => request(`/api/comments/lugar/${placeId}`),
createCommentPublic: (payload) => request('/api/comments', { method: 'POST', body: payload }),
createCommentAsUser: (payload, token) => request('/api/comments/yo', { method: 'POST', token, body: payload }),

// ✅ NUEVO
updateComment: (id, payload, token) => request(`/api/comments/${id}`, { method: 'PUT', token, body: payload }),
deleteComment: (id, token) => request(`/api/comments/${id}`, { method: 'DELETE', token }),

};
