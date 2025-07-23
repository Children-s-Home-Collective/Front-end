import React from 'react'
import Navigationbar from './Navigationbar'
import Header from './Header'

function HomePage() {
  return (
    <div className='mypage'>
        <Header />
        <div className='content1'>
            <div className='line1'>
                <div className="paragraph">
                     <p>Connect <em>Hearts</em>,</p>
                     <p>Change<em>Lives</em></p>
                </div>
                <img className='imageline1'src='https://images.unsplash.com/photo-1524069290683-0457abfe42c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTV8fGNoaWxkcmVufGVufDB8MHwwfHx8MA%3D%3D' alt='children image'></img>
            </div>
            <div className='line2'>
                <img src='https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2hpbGRyZW58ZW58MHwwfDB8fHww'></img>
                <div className='paragraph2'>
                   <p>Discover children's homes across the country and make a direct impact.</p>
                   <p>From donations to visits, your support creates lasting change in vulnerable children's lives.</p> 
                   <p>Browse Children's Homes</p>
                 </div>

            </div>
        </div>
        <div className='content2'>
            <h1>About Children’s home collective</h1>
            <p>For over 25 years, we've been dedicated to providing loving homes and comprehensive care for children who need it most. Our mission is to heal hearts, build futures, and create lasting change.</p>
        </div>
        <div className='content3'>
           <div className='lefttext'>
            <h3>Our Mission. </h3>
            <p> At Little Hearts Home, we believe every child deserves the opportunity to thrive in a safe, loving environment. We provide residential care, educational support, healthcare, and emotional healing for children who have experienced trauma, abandonment, or difficult circumstances.
                Our holistic approach focuses on healing the whole child - mind, body, and spirit - while preparing them for successful futures. We work closely with families, communities, and professionals to ensure each child receives the comprehensive support they need.
            </p>
           </div>
            <div className='righttext'>
            <img src='https://img.icons8.com/?size=48&id=19411&format=png'></img>
            <h1>Our Promise</h1>
            <p>To provide every child with the love, care, and opportunities they need to heal, grow, and build bright futures.</p>
           </div>
        </div>
        <div className='content4'>
            <div>
                <img src='https://img.icons8.com/?size=80&id=OkV6IYJJ9l0h&format=png'></img>
                <h2>Love and Care</h2>
                <p>Every child receives unconditional love and personalized care in a nurturing environment.</p>
            </div>
            <div >
                <img src='https://img.icons8.com/?size=48&id=9III381sJEY5&format=png'></img>
                <h2>Safety first</h2>
                <p>We provide secure, protected spaces where children feel safe to heal and grow.</p>
            </div>
            <div>
                <img src='https://img.icons8.com/?size=50&id=11220&format=png'></img>
                <h2>Community</h2>
                <p>Building strong relationships and connections that last a lifetime.</p>
            </div>
            <div>
                <img src='https://img.icons8.com/?size=48&id=wFfu6zXx15Yk&format=png'></img>
                <h2>Family Environment</h2>
                <p>Creating warm, family-like atmospheres where children truly belong.</p>
            </div>

        </div>
        <div className='content5'>
            <h1>Our Partners</h1>
            <div className='subcontent5'>
                <img src='https://www.who.int/ResourcePackages/WHO/assets/dist/images/logos/en/h-logo-blue.svg'></img>
                <img src='https://www.caritasnairobi.org/wp-content/uploads/2020/02/Caritas-PNG-e1582548529841.png'></img>
                <img src="https://i0.wp.com/amref.org/kenya/wp-content/uploads/sites/2/2020/03/white.png?w=1460&ssl=1" alt="" />
                <img src="https://www.barclays.co.uk/content/dam/icons/favicons/barclays/Eagle_RGB_Cyan_Large.svg" alt="" />
                <img src="https://amanichildrenhome.org/wp-content/uploads/2022/01/logo.png" alt="" />
            </div>
        </div>
        <footer >
            <div className='contact'>
                <h2>Our contact info</h2>
                  <div className='website'>
                    <img src='https://img.icons8.com/?size=50&id=9918&format=png' />
                    <p>The children’s home collective.com</p>
                  </div>
                  <div className='email'>
                    <img src="https://img.icons8.com/?size=50&id=63&format=png" alt="" />
                    <p>childrenshomecollective@gmail.com</p>
                  </div>
                  <div className='telephone'>
                    <img src='https://img.icons8.com/?size=50&id=26015&format=png' />
                    <p>0722222222</p>
                  </div>
                  <div className='location'>
                    <img src='https://img.icons8.com/?size=50&id=3723&format=png' />
                    <p>1st floor, Ngong lane plaza,Ngong road</p>
                  </div>
            </div>
            <div className='socials'>
               <h2>Our socials</h2>
               <img src="https://img.icons8.com/?size=50&id=118638&format=png" alt="tiktok" />
               <img src="https://img.icons8.com/?size=50&id=32309&format=png" alt="instagram" />
               <img src="https://img.icons8.com/?size=50&id=118467&format=png" alt="facebook" />
               <img src="https://img.icons8.com/?size=50&id=phOKFKYpe00C&format=png" alt="x" />
            </div>
            <div className='quote'>
                <p>“Unity is strength... when there is teamwork and collaboration, wonderful things can be achieved.”</p>
                <em>Mattie Stepanek</em>
            </div>
        </footer>
        <div className='trademark'>
            <p>----------------------------------------------------------------------------------------------------------------------------------------------</p>
            <p>made with </p>
            <img src='https://img.icons8.com/?size=50&id=37975&format=png' alt='love' /> 
            <p>by senior devs</p>
            <p>----------------------------------------------------------------------------------------------------------------------------------------------</p>
        </div>
    </div>
  )
}

export default HomePage