import React from 'react'

export default function CommentsList({ comments }) {
  if (!comments?.length) {
    return <div className="text-muted">Aún no hay comentarios para este lugar.</div>
  }

  return (
    <div className="list-group">
      {comments.map((c) => (
        <div className="list-group-item" key={c._id || `${c.lugar}-${c.createdAt}`}
        >
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <div className="fw-semibold">{c.nombreAutor || c?.usuario?.nombre || 'Anónimo'}</div>
              <div className="text-muted-small">{new Date(c.createdAt || Date.now()).toLocaleString()}</div>
            </div>
          </div>
          <div className="mt-2">{c.texto}</div>
        </div>
      ))}
    </div>
  )
}
