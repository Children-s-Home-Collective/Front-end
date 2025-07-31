import React,{useState,useEffect} from 'react'
import Header from './Header'

function VolunteerPage() {
  const [homes, setHomes] = useState([]);
  const [selectedHome, setSelectedHome] = useState('');
  const [name, setName] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [area, setArea] = useState('');
  const [message, setMessage] = useState('');

useEffect(() => {
  const token = localStorage.getItem('access_token'); // get the stored access token

  fetch('https://back-end-1-wour.onrender.com/homes/', {
    headers: {
      Authorization: `Bearer ${token}`, // include token in header
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      if (!response.ok) throw new Error('Failed to fetch homes');
      return response.json();
    })
    .then(data => setHomes(data))
    .catch(error => console.error('Fetch error:', error));
}, []);
const handleSubmit = async () => {
    const token = localStorage.getItem('access_token');
    const user = JSON.parse(localStorage.getItem('user'));
    if (!token) {
      setMessage('You must be logged in to volunteer.');
      return;
    }

    if (!name || !telephone || !email || !selectedHome || !area) {
      setMessage('Please fill in all fields.');
      return;
    }

    const payload = {
      name:name,
      phone_number: telephone,
      email:email,
      home_id: selectedHome,
      description: area,
    };

    try {
      const res = await fetch('https://back-end-1-wour.onrender.com/volunteers/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        return;
      }

      alert('Thank you for volunteering!');
      setName('');
      setTelephone('');
      setEmail('');
      setSelectedHome('');
      setArea('');
    } catch (error) {
      setMessage('Network error. Please try again.');
      console.error(error);
    }
  };
  return (
    <div className='volunteer'>
         <Header />
         <div className='volunteerbox'>
              <div className='volunteerleft'>
                <p>The children’s Home collective offers numerous opportunities for you to join us in helping children thrive. We welcome volunteers who are passionate about working with children and serving the community. The impact volunteers have on the various children’s home is invaluable. The positive interactions that volunteers offer help the children to thrive better and bring joy into their lives. We deeply appreciate all of our volunteers and their efforts.</p>
                <h3>How to volunteer</h3>
                <p>Volunteer opportunities vary in time requirements and length commitments.Most of our volunteer openings are fulfilled during regular business hours,Monday to Friday,8 a.m until 5p.m and some at weekends. We have modest accommodations for international volunteers as well, you could be on leave or on a school break and would love to take time to volunteer with us.</p>
                <p>There are some instances, such as special events, birthday parties and toy drives, which may be scheduled during weekend or evening hours.</p>
                <ol>
                    <li>Loving & caring for the babies</li>
                    <li>Offer mentorship programs</li>
                    <li>Play games </li>
                    <li>Share your special talents with the kids</li>
                    <li>Tutor the children </li>
                    <li>Work in our health care facilities</li>
                    <li> Help in construction works</li>
                </ol>
                <p>We encourage companies, churches and other organized groups to volunteer and interact with the children</p>
              </div>
              <div className='volunteerright'>
                <div className='notice'><p>Get started now</p></div>
                <p>Please fill the form below to volunteer with Children’s home collective </p>
                <form onSubmit={e=>e.preventDefault()}>
              <input
              type="text"
              placeholder='name'
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder='telephone number'
              value={telephone}
              onChange={e => setTelephone(e.target.value)}
            />
            <input
              type="text"
              placeholder='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <select
              className='last2'
              value={selectedHome}
              onChange={(e) => setSelectedHome(e.target.value)}
            >
              <option value="">Select a children's home to volunteer</option>
              {homes.map((home) => (
                <option key={home.id} value={home.id}>
                  {home.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              className='last'
              placeholder='Area to volunteer in'
              value={area}
              onChange={e => setArea(e.target.value)}
            />
                </form>
                <button type='button' onClick={handleSubmit}>Volunteer now</button>
                   {message && <p>{message}</p>}
              </div>
         </div>
    </div>
  )
}

export default VolunteerPage