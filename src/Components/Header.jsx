import React from 'react'
import Navigationbar from './Navigationbar'

function Header() {
  return (
    <div>
        <div className='row1'>
        <div className='left'>
            <img src='https://img.icons8.com/?size=64&id=NzaHJt0XKIWl&format=png'></img>
            <p>The Children's Home Collective</p>
        </div>
        <Navigationbar />
        <img src='https://img.icons8.com/?size=80&id=108652&format=png' alt='user image'></img>
    </div>
    </div>
  )
}

export default Header