import React from 'react'

export default function ToastHost({ toast, onClose }) {
  if (!toast) return null
  return (
    <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1080 }}>
      <div className={`toast show align-items-center text-bg-${toast.type || 'primary'} border-0`} role="alert">
        <div className="d-flex">
          <div className="toast-body">{toast.message}</div>
          <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={onClose} aria-label="Close"></button>
        </div>
      </div>
    </div>
  )
}
