import React, { useState } from 'react'

export default function CommentForm({ mode, onSubmit, loading }) {
  const [nombreAutor, setNombreAutor] = useState('')
  const [texto, setTexto] = useState('')

  const isPublic = mode === 'public'

  const submit = (e) => {
    e.preventDefault()
    if (!texto.trim()) return
    onSubmit({ texto: texto.trim(), nombreAutor: isPublic ? (nombreAutor.trim() || 'Anónimo') : undefined })
    setTexto('')
  }

  return (
    <form onSubmit={submit} className="card card-body mt-3">
      <h6 className="mb-3">Agregar comentario</h6>
      {isPublic && (
        <div className="mb-2">
          <label className="form-label">Tu nombre (opcional)</label>
          <input className="form-control" value={nombreAutor} onChange={(e)=>setNombreAutor(e.target.value)} placeholder="Ej. Edwin" />
        </div>
      )}
      <div className="mb-2">
        <label className="form-label">Comentario</label>
        <textarea className="form-control" rows={3} value={texto} onChange={(e)=>setTexto(e.target.value)} placeholder="Escribe tu comentario..." />
      </div>
      <button className="btn btn-primary" disabled={loading || !texto.trim()}>
        {loading ? 'Enviando...' : 'Publicar'}
      </button>
      <div className="text-muted-small mt-2">
        {mode === 'auth'
          ? 'Se guardará como usuario autenticado (usa /api/comments/yo).'
          : 'Se guardará como público (usa /api/comments).'}
      </div>
    </form>
  )
}
