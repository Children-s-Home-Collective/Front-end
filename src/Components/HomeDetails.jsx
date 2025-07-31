import React,{useState} from 'react';
import { useSelector } from 'react-redux';
import Header from './Header';
import About from './About';
import Donate from './Donate';
import Visit from './Visit';
import Review from './Review';
import Gallery from './Gallery';
import FundingGoal from './Fundinggoal';
import ContactInfo from './Contactinfo';

function HomeDetails() {
  const home = useSelector((state) => state.childHome.selectedHome);
  const [activeSection, setActiveSection] = useState('about');

  const sectionStyle = {
    width: '1000px',
    height: '400px',
    backgroundImage: `url(${home.photos[0].image_url})`,
     backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.5)), url(${home.photos[0].image_url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    color:'white',
  };

  if (!home) {
    return <p>No home selected.</p>;
  }
  

  const renderContent = () => {
    switch (activeSection) {
      case 'about':
        return <About details={home}/>;
      case 'donate':
        return <Donate homeid={home.id} /> ;
      case 'visit':
        return <Visit homeid={home.id}/>;
      case 'reviews':
        return <Review name={home.name} homeid={home.id}/>;
      case 'gallery':
        return <Gallery name={home.name} images={home.photos}/>
      default:
        return <p>Select an option.</p>;
    }
  };

  return (
    <div className='home-details'>
      <Header />
      <div className='home'>
        <div className='homecontent1'>
            <div className='homebackground' style={sectionStyle}>
                <p>{home.name}</p>
                <p><img src='https://img.icons8.com/?size=32&id=f8vpZHFhtUcH&format=png' />{home.location}</p>
            </div>
            <ul>
                <li onClick={() => setActiveSection('about')}>About us</li>
                <li onClick={() => setActiveSection('donate')}>Donate</li>
                <li onClick={() => setActiveSection('visit')}>Schedule visit </li>
                <li onClick={() => setActiveSection('reviews')}>Reveiws</li>
                <li onClick={() => setActiveSection('gallery')}>Gallery</li>
            </ul>
        </div>
        <div className='homecontent2'>
            {renderContent()}
        </div>
        <div className='homecontent3'>
            <FundingGoal homeid={home.id} />
            <ContactInfo contact={home}/>
        </div>
      </div>
    </div>
  );
}

export default HomeDetails;
