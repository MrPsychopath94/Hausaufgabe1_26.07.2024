import React from 'react'
import { Link } from 'react-router-dom'

function SideBar() {
  return (
    <div>
        <Link to="/addAnimal">Tiere Hinzufügen</Link>
        <Link to="/list">Alle Tiere anzeigen</Link>
    </div>
  )
}

export default SideBar