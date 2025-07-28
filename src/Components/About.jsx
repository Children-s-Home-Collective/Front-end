import React from 'react'

function About({details}) {
  return (
    <div className='aboutus'>
        <p>{details.description}</p>
    </div>
  )
}

export default About