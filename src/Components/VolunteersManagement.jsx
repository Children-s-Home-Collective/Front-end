import React, { useEffect, useState } from 'react';

const VolunteersManagement = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    description: '',
    home_id: ''
  });

  const token = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const res = await fetch('https://back-end-1-wour.onrender.com/volunteers/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('Failed to fetch volunteers');

        const data = await res.json();

        const volunteersWithHomes = await Promise.all(
          data.map(async (vol) => {
            let homeName = 'N/A';
            if (vol.home_id) {
              try {
                const homeRes = await fetch(`https://back-end-1-wour.onrender.com/homes/${vol.home_id}`);
                if (homeRes.ok) {
                  const homeData = await homeRes.json();
                  homeName = homeData.name || 'Unnamed';
                }
              } catch {
                homeName = 'Unavailable';
              }
            }
            return { ...vol, homeName };
          })
        );

        setVolunteers(volunteersWithHomes);
      } catch (err) {
        console.error(err.message);
      }
    };

    if (token) fetchVolunteers();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://back-end-1-wour.onrender.com/volunteers/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.details || 'Failed to add volunteer');
      }

      const createdVolunteer = await response.json();

      let homeName = 'N/A';
      if (createdVolunteer.home_id) {
        try {
          const homeRes = await fetch(`https://back-end-1-wour.onrender.com/homes/${createdVolunteer.home_id}`);
          const homeData = await homeRes.json();
          homeName = homeData.name || 'Unnamed';
        } catch {
          homeName = 'Unavailable';
        }
      }

      setVolunteers(prev => [...prev, { ...createdVolunteer, homeName }]);
      setFormData({ name: '', email: '', phone_number: '', description: '', home_id: '' });
      setShowForm(false);
    } catch (err) {
      console.error('Error adding volunteer:', err.message);
    }
  };

  const deleteVolunteer = async (id) => {
    try {
      const response = await fetch(`https://back-end-1-wour.onrender.com/volunteers/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 204) {
        setVolunteers((prev) => prev.filter((vol) => vol.id !== id));
      } else {
        const error = await response.json();
        throw new Error(error.details || 'Failed to delete');
      }
    } catch (err) {
      console.error('Error deleting volunteer:', err.message);
    }
  };

  return (
    <div>
      <h2>Volunteers</h2>

      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Add Volunteer'}
      </button>

      {showForm && (
        <form onSubmit={handleFormSubmit} style={{ marginTop: '1rem' }}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="phone_number"
            placeholder="Phone Number"
            value={formData.phone_number}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="home_id"
            placeholder="Home ID"
            value={formData.home_id}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Submit</button>
        </form>
      )}

      <ul style={{ marginTop: '2rem' }}>
        {volunteers.map((vol) => (
          <li key={vol.id} style={{ marginBottom: '1rem' }}>
            <strong>Volunteer:{vol.name}</strong> 
            <p>Email:{vol.email}</p> 
            <p>Home: {vol.homeName}</p>
            <p>Work Description:{vol.description}</p>
            <button onClick={() => deleteVolunteer(vol.id)} style={{ marginLeft: '1rem', color: 'red' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VolunteersManagement;
