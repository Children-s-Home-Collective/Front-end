import React from 'react'
import ContactInfo from './Contactinfo'

function About({details}) {
  return (
    <div className='aboutus'>
        <p>{details.description}</p>
        
    </div>
  )
}

export default About