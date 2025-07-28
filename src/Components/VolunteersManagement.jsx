import React, { useEffect, useState } from 'react';

const VolunteersManagement = () => {
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    fetch('/api/volunteers')
      .then(res => res.json())
      .then(data => setVolunteers(data));
  }, []);

  const addVolunteer = () => { /* Add logic */ };
  const deleteVolunteer = (id) => { /* Delete logic */ };

  return (
    <div>
      <h2>Volunteers</h2>
      <button onClick={addVolunteer}>Add Volunteer</button>
      <ul>
        {volunteers.map(vol => (
          <li key={vol.id}>
            {vol.name} – {vol.email} (Home: {vol.homeName})
            <button onClick={() => deleteVolunteer(vol.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VolunteersManagement;
