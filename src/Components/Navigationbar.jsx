import React from 'react'
import {Link} from 'react-router-dom'

function Navigationbar() {
  return (
    <div>
        <nav className='navbar'>
            <Link to="/">Home</Link>
            <Link to="/programmes">Programs</Link>
            <Link to="/volunteer">Volunteer</Link>
            <Link to="/children's homes">Browse Children's homes</Link>
        </nav>
    </div>
  )
}

export default Navigationbar