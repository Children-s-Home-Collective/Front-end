import React, { useEffect, useState } from 'react';

const HomesManagement = () => {
  const [homes, setHomes] = useState([]);
  const [token, setToken] = useState('');
  const [editingHomeId, setEditingHomeId] = useState(null);
  const [editHomeData, setEditHomeData] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [newHome, setNewHome] = useState({
    name: '',
    location: '',
    phone_number: '',
    email: '',
    description: '',
    children: [{ first_name: '', last_name: '', age: '', gender: '' }],
    photos: [{ image_url: '' }]
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('access_token');
    setToken(storedToken);
    if (storedToken) fetchHomes(storedToken);
  }, []);

  const fetchHomes = (authToken) => {
    fetch('https://back-end-1-wour.onrender.com/homes/', {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${authToken}` }
    })
      .then(res => res.json())
      .then(data => setHomes(data))
      .catch(err => console.error('Failed to fetch homes:', err));
  };

  const deleteHome = (homeId) => {
    fetch(`https://back-end-1-wour.onrender.com/homes/${homeId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => {
        if (res.ok) setHomes(prev => prev.filter(home => home.id !== homeId));
        else console.error('Failed to delete home');
      })
      .catch(err => console.error('Error deleting home:', err));
  };

  const toggleForm = () => {
    setShowForm(prev => !prev);
    setMessage('');
  };

  const handleInputChange = (e, index, type) => {
    const updated = [...newHome[type]];
    updated[index][e.target.name] = e.target.value;
    setNewHome(prev => ({ ...prev, [type]: updated }));
  };

  const handleHomeFieldChange = (e) => {
    setNewHome(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addChildField = () => {
    setNewHome(prev => ({
      ...prev,
      children: [...prev.children, { first_name: '', last_name: '', age: '', gender: '' }]
    }));
  };

  const addPhotoField = () => {
    setNewHome(prev => ({
      ...prev,
      photos: [...prev.photos, { image_url: '' }]
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setMessage('Submitting...');

    try {
      const response = await fetch('https://back-end-1-wour.onrender.com/homes/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newHome)
      });

      const data = await response.json();

      if (response.ok) {
        setHomes(prev => [...prev, data]);
        setMessage('✅ Home added successfully!');
        setShowForm(false);
        setNewHome({
          name: '', location: '', phone_number: '', email: '', description: '',
          children: [{ first_name: '', last_name: '', age: '', gender: '' }],
          photos: [{ image_url: '' }]
        });
      } else {
        setMessage(`❌ ${data.error}: ${data.details}`);
      }
    } catch (err) {
      setMessage('❌ Failed to add home');
      console.error(err);
    }
  };
const startEditing = (home) => {
  setEditingHomeId(home.id);
  setEditHomeData({ ...home });
};

const cancelEdit = () => {
  setEditingHomeId(null);
  setEditHomeData(null);
};

const handleEditInputChange = (e, index, type) => {
  const updated = [...editHomeData[type]];
  updated[index][e.target.name] = e.target.value;
  setEditHomeData(prev => ({ ...prev, [type]: updated }));
};

const handleEditFieldChange = (e) => {
  setEditHomeData(prev => ({ ...prev, [e.target.name]: e.target.value }));
};

const submitEditForm = async (e) => {
  e.preventDefault();
  setMessage('Updating...');

  try {
    const response = await fetch(`https://back-end-1-wour.onrender.com/homes/${editingHomeId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editHomeData)
    });

    const data = await response.json();

    if (response.ok) {
      setHomes(prev =>
        prev.map(home => (home.id === editingHomeId ? data : home))
      );
      setMessage('✅ Home updated!');
      cancelEdit();
    } else {
      setMessage(`❌ ${data.error}: ${data.details}`);
    }
  } catch (err) {
    setMessage('❌ Update failed');
    console.error(err);
  }
};

  const getMostVisited = () => homes.reduce((a, b) => (a.visits > b.visits ? a : b), homes[0] || {});
  const getInNeed = () => homes.find(h => h.donationStatus === 'low') || null;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Children’s Homes Management</h2>

      <button onClick={toggleForm}>
        {showForm ? '❌ Cancel' : '➕ Add Home'}
      </button>

      {showForm && (
        <form onSubmit={handleFormSubmit} style={{ marginTop: '20px', border: '1px solid #ddd', padding: '15px' }}>
          <h3>Add Home</h3>
          <input name="name" placeholder="Name" value={newHome.name} onChange={handleHomeFieldChange} required /><br />
          <input name="location" placeholder="Location" value={newHome.location} onChange={handleHomeFieldChange} required /><br />
          <input name="phone_number" placeholder="Phone Number" value={newHome.phone_number} onChange={handleHomeFieldChange} required /><br />
          <input name="email" placeholder="Email" value={newHome.email} onChange={handleHomeFieldChange} required /><br />
          <textarea name="description" placeholder="Description" value={newHome.description} onChange={handleHomeFieldChange} required /><br />

          <h4>Children</h4>
          {newHome.children.map((child, index) => (
            <div key={index}>
              <input name="first_name" placeholder="First Name" value={child.first_name} onChange={(e) => handleInputChange(e, index, 'children')} required />
              <input name="last_name" placeholder="Last Name" value={child.last_name} onChange={(e) => handleInputChange(e, index, 'children')} required />
              <input name="age" placeholder="Age" value={child.age} onChange={(e) => handleInputChange(e, index, 'children')} required />
              <input name="gender" placeholder="Gender" value={child.gender} onChange={(e) => handleInputChange(e, index, 'children')} required /><br />
            </div>
          ))}
          <button type="button" onClick={addChildField}>Add Child</button>

          <h4>Photos</h4>
          {newHome.photos.map((photo, index) => (
            <div key={index}>
              <input name="image_url" placeholder="Image URL" value={photo.image_url} onChange={(e) => handleInputChange(e, index, 'photos')} required />
            </div>
          ))}
          <button type="button" onClick={addPhotoField}>Add Photo</button>

          <br /><br />
          <button type="submit">Submit Home</button>
          {message && <p>{message}</p>}
        </form>
      )}

      <ul style={{ marginTop: '30px' }}>
        {homes.map(home => (
          <li key={home.id} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc' }}>
            <h4>{home.name} – {home.location}</h4>
            <p>Phone: {home.phone_number} | Email: {home.email}</p>
            <p>Children Count: {home.children?.length || 0}</p>
            <p>Photos: {home.photos?.length || 0}</p>
            <button onClick={() => startEditing(home)}>✏️ Edit</button>
            <button onClick={() => deleteHome(home.id)}>🗑 Delete</button>
{editingHomeId === home.id && editHomeData && (
  <form onSubmit={submitEditForm} style={{ border: '1px solid #ddd', padding: '10px', marginTop: '10px' }}>
    <h4>Edit Home</h4>
    <input name="name" placeholder="Name" value={editHomeData.name} onChange={handleEditFieldChange} required /><br />
    <input name="location" placeholder="Location" value={editHomeData.location} onChange={handleEditFieldChange} required /><br />
    <input name="phone_number" placeholder="Phone" value={editHomeData.phone_number} onChange={handleEditFieldChange} required /><br />
    <input name="email" placeholder="Email" value={editHomeData.email} onChange={handleEditFieldChange} required /><br />
    <textarea name="description" placeholder="Description" value={editHomeData.description} onChange={handleEditFieldChange} required /><br />

    <h5>Children</h5>
    {editHomeData.children?.map((child, index) => (
      <div key={index}>
        <input name="first_name" placeholder="First Name" value={child.first_name} onChange={(e) => handleEditInputChange(e, index, 'children')} />
        <input name="last_name" placeholder="Last Name" value={child.last_name} onChange={(e) => handleEditInputChange(e, index, 'children')} />
        <input name="age" placeholder="Age" value={child.age} onChange={(e) => handleEditInputChange(e, index, 'children')} />
        <input name="gender" placeholder="Gender" value={child.gender} onChange={(e) => handleEditInputChange(e, index, 'children')} /><br />
      </div>
    ))}

    <h5>Photos</h5>
    {editHomeData.photos?.map((photo, index) => (
      <div key={index}>
        <input name="image_url" placeholder="Image URL" value={photo.image_url} onChange={(e) => handleEditInputChange(e, index, 'photos')} />
      </div>
    ))}

    <br />
    <button type="submit">✅ Save</button>
    <button type="button" onClick={cancelEdit} style={{ marginLeft: '10px' }}>Cancel</button>
  </form>
)}

          </li>
        ))}
      </ul>


      <h4>🏆 Most Visited: {getMostVisited()?.name || 'N/A'}</h4>
      <h4>❗ Needs Donations: {getInNeed()?.name || 'None'}</h4>
    </div>
  );
};

export default HomesManagement;
