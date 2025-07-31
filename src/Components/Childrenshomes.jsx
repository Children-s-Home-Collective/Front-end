import React, { useState,useEffect } from 'react';
import Header from './Header';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSelectedHome } from './features/childHomeSlice';

function Childrenshomes() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [data,setHome]=useState([])
  const [error,setError]=useState("")
  const [loading, setLoading] = useState(true);

  // const data = [
  //   {
  //     image: "https://images.unsplash.com/photo-1540479859555-17af45c78602?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpbGRyZW58ZW58MHwwfDB8fHww",
  //     name: "Brickstone Home",
  //     location: "Backyard, UK",
  //     description: "Providing sanctuary and hope for children in need..."
  //   },
  //   {
  //     image: "https://images.unsplash.com/photo-1534982841079-afde227ada8f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNoaWxkcmVufGVufDB8MHwwfHx8MA%3D%3D",
  //     name: "Little Hearts Home",
  //     location: "Umoja, Nairobi",
  //     description: "Creating bright futures for children through love..."
  //   },
  //   {
  //     image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2hpbGRyZW58ZW58MHwwfDB8fHww",
  //     name: "Lee High Home",
  //     location: "Kansas, USA",
  //     description: "A warm and nurturing environment where children grow..."
  //   },
  //   {
  //     image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2hpbGRyZW58ZW58MHwwfDB8fHww",
  //     name: "Warwick Home",
  //     location: "New Amsterdam, Nairobi",
  //     description: "Every day is a new beginning at our center..."
  //   },
  //   {
  //     image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpbGRyZW58ZW58MHwwfDB8fHww",
  //     name: "A New Dawn",
  //     location: "Buruburu, Nairobi",
  //     description: "Building bridges to brighter futures..."
  //   }
  // ];
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    fetch('https://back-end-1-wour.onrender.com//homes/', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then(data =>{ setHome(data);setLoading(false)})
      .catch(err => {
        console.error(err);
        setError("Something went wrong while fetching data.");
        setLoading(false);
      });
  }, [])
  const handleViewDetails = (home) => {
    dispatch(setSelectedHome(home));
    navigate('/homedetails');
  };

  const filteredData = data.filter(home => {
    const query = searchQuery.toLowerCase();
    return home.name.toLowerCase().includes(query) || home.location.toLowerCase().includes(query);
  });

  return (
    <div>
      <Header />
      <div className='childparagraph'>
        <h2>Find Children's Homes to Support</h2>
        <p>Discover amazing children's homes across the country and make a direct impact in the lives of vulnerable children who need your support.</p>
      </div>

      
      <div className='searchbar' style={{ padding: '1rem' }}>
        <input
          type="text"
          placeholder="Search by name or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: '10px',
            width: '1000px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '25px'
          }}
        />
      </div>

      
      <div className='homes'>
        {filteredData.length > 0 ? (
          filteredData.map(home => (
            <div className='singlehome' key={home.name}>
              <div className='picture'>
                <img src={home.photos[0].image_url} alt={home.name} />
              </div>
              <div className='details'>
                <h4>{home.name}</h4>
                <section className='location'>
                  <img src='https://img.icons8.com/?size=24&id=85149&format=png' alt="location-icon" />
                  <p>{home.location}</p>
                </section>
                <p>{home.description.slice(0,40)}.......</p>
              </div>
              <button onClick={() => handleViewDetails(home)}>
                View more details
                <img src='https://img.icons8.com/?size=50&id=39969&format=png' alt="arrow-icon" />
              </button>
            </div>
          ))
        ) : (
          <p style={{ padding: '1rem' }}>No homes found please wait as we fetch data</p>
        )}
      </div>
    </div>
  );
}

export default Childrenshomes;
