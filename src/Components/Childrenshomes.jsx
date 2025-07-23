import React from 'react'
import Header from './Header'

function Childrenshomes() {
   const data=[
    {
      image:"https://images.unsplash.com/photo-1540479859555-17af45c78602?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpbGRyZW58ZW58MHwwfDB8fHww",
      name:"Brickstone Home",
      location:"Backyard,UK",
      description:"Providing sanctuary and hope for children in need. Our holistic approach focuses on healing trauma and ....."
    },
    {
      image:"https://images.unsplash.com/photo-1534982841079-afde227ada8f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNoaWxkcmVufGVufDB8MHwwfHx8MA%3D%3D",
      name:"Little Hearts Home",
      location:"Umoja,Nairobi",
      description:"Creating bright futures for children through love, education and community support. Our village-style ........"
    },
    {
      image:"https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2hpbGRyZW58ZW58MHwwfDB8fHww",
      name:"Lee High  Home",
      location:"Kansas,USA",
      description:"A warm and nurturing environment where children heal, grow, and thrive. We provide comprehensive......."
    },
    {
      image:"https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2hpbGRyZW58ZW58MHwwfDB8fHww",
      name:"Warwick  Home",
      location:"New Amsterdam,Nairobi",
      description:"Every day is a new beginning at our center. We specialize in helping children transition to permanent families while providing excellent interim care......"
    },
    {
      image:"https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpbGRyZW58ZW58MHwwfDB8fHww",
      name:"A new dawn",
      location:"Buruburu,Nairobi",
      description:"Building bridges to brighter futures. Our innovative programs help children overcome challenges and............"
    }
  ]
  return (
    <div>
      <Header />
      <div className='childparagraph'>
        <h2>Find Children's Homes to Support</h2>
        <p>Discover amazing children's homes across the country and make a direct impact in the lives of vulnerable children who need your support.</p>
      </div>
      <div className='searchbar'>

      </div>
      <div className='homes'>
        {data.map(dats=>
          <div className='singlehome'>
            <div className='picture'>
              <img src={dats.image}/>
            </div>
            <div className='details'>
              <h4>{dats.name}</h4>
              <section className='location'>
                <img src='https://img.icons8.com/?size=24&id=85149&format=png'/>
                 <p>{dats.location}</p>
              </section>
              <p>{dats.description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Childrenshomes