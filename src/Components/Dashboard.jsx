import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [homes, setHomes] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    capacity: '',
  });

  const BASE_URL = "http://localhost:5000/homes"; 

  useEffect(() => {
    fetchHomes();
  }, []);

  const fetchHomes = async () => {
    try {
      const res = await fetch(BASE_URL);
      const data = await res.json();
      setHomes(data);
    } catch (err) {
      console.error('Failed to fetch homes:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(BASE_URL + '/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const newHome = await res.json();
        setHomes(prev => [...prev, newHome]);
        setFormData({ name: '', location: '', capacity: '' });
      } else {
        const error = await res.json();
        alert('Error: ' + JSON.stringify(error));
      }
    } catch (err) {
      console.error('Failed to create home:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this home?')) return;

    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: {
        
        },
      });

      if (res.ok) {
        setHomes(prev => prev.filter(home => home.id !== id));
      } else {
        alert('Failed to delete home');
      }
    } catch (err) {
      console.error('Failed to delete home:', err);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Admin Dashboard</h1>

      <h2>Add New Children’s Home</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />{' '}
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />{' '}
        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          value={formData.capacity}
          onChange={handleChange}
          required
        />{' '}
        <button type="submit">Add Home</button>
      </form>

      <h2>All Homes</h2>
      {homes.length > 0 ? (
        <ul>
          {homes.map((home) => (
            <li key={home.id}>
              <strong>{home.name}</strong> — {home.location} — Capacity: {home.capacity}{' '}
              <button onClick={() => handleDelete(home.id)} style={{ color: 'red' }}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No homes found.</p>
      )}
    </div>
  );
};

export default Dashboard;
