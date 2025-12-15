import React from 'react'

export default function PlaceCard({ place, onOpen }) {
  return (
    <div className="col">
      <div className="card h-100 shadow-sm pointer" onClick={() => onOpen(place)}>
        {place.urlImagen ? (
          <img className="card-img-top" src={place.urlImagen} alt={place.nombre} />
        ) : (
          <div className="card-img-top d-flex align-items-center justify-content-center bg-light text-muted">
            Sin imagen
          </div>
        )}
        <div className="card-body">
          <h5 className="card-title">{place.nombre}</h5>
          <p className="card-text text-muted-small">{place.descripcion}</p>
          {place.ubicacion ? <div className="small text-muted">📍 {place.ubicacion}</div> : null}
        </div>
      </div>
    </div>
  )
}
