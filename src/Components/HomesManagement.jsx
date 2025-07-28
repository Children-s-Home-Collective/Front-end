import React, { useEffect, useState } from 'react';

const HomesManagement = () => {
  const [homes, setHomes] = useState([]);

  useEffect(() => {
    fetch('/api/homes')
      .then(res => res.json())
      .then(data => setHomes(data));
  }, []);

  const addHome = () => { /* Add logic */ };
  const deleteHome = (homeId) => { /* Delete logic */ };

  const getMostVisited = () => {
    return homes.reduce((a, b) => (a.visits > b.visits ? a : b), {});
  };

  const getInNeed = () => {
    return homes.find(home => home.donationStatus === 'low');
  };

  return (
    <div>
      <h2>Children’s Homes</h2>
      <button onClick={() => addHome()}>Add Home</button>
      <ul>
        {homes.map(home => (
          <li key={home.id}>
            {home.name} – {home.city}<br />
            Volunteers: {home.volunteersCount}, Visitors: {home.visitorsCount}
            <br />
            Donations Needed: {home.donationStatus === 'low' ? 'Yes' : 'No'}
            <button onClick={() => deleteHome(home.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h4>Most Visited Home: {getMostVisited()?.name || 'N/A'}</h4>
      <h4>Home Needing Donations: {getInNeed()?.name || 'None'}</h4>
    </div>
  );
};

export default HomesManagement;
