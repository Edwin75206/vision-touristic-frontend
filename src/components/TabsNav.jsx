import React from 'react'
import { NavLink } from 'react-router-dom'

export default function TabsNav({ isAdmin }) {
  const base = 'nav-link'
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item"><NavLink className={({isActive})=>`${base} ${isActive?'active':''}`} to="/">Landing</NavLink></li>
      <li className="nav-item"><NavLink className={({isActive})=>`${base} ${isActive?'active':''}`} to="/lugares">Lugares</NavLink></li>
      <li className="nav-item"><NavLink className={({isActive})=>`${base} ${isActive?'active':''}`} to="/comentarios">Comentarios</NavLink></li>
      <li className="nav-item"><NavLink className={({isActive})=>`${base} ${isActive?'active':''}`} to="/login">Login</NavLink></li>
      {isAdmin && (
        <li className="nav-item"><NavLink className={({isActive})=>`${base} ${isActive?'active':''}`} to="/admin">Admin</NavLink></li>
      )}
    </ul>
  )
}
