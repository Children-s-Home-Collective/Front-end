import React, { useEffect, useState } from 'react';

function VisitorsManagement() {
  const [visits, setVisits] = useState([]);
  const [userNames, setUserNames] = useState({});
  const [homeNames, setHomeNames] = useState({});
  const [mostVisitedHome, setMostVisitedHome] = useState(null);
  const [totalVisitors, setTotalVisitors] = useState(0);
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        // Fetch all visits
        const res = await fetch('https://back-end-1-wour.onrender.com/visitor/', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.details || 'Failed to fetch visitors');
        }

        const data = await res.json();
        setVisits(data);

        // Extract unique user IDs and home IDs
        const uniqueUserIds = [...new Set(data.map(v => v.user_id).filter(Boolean))];
        const uniqueHomeIds = [...new Set(data.map(v => v.home_id).filter(Boolean))];

        // Fetch user names in parallel and cache them
        const fetchedUserNames = {};
        await Promise.all(uniqueUserIds.map(async (id) => {
          try {
            const res = await fetch(`https://back-end-1-wour.onrender.com/users/${id}`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
              const userData = await res.json();
              fetchedUserNames[id] = userData.name || `User ${id}`;
            } else {
              fetchedUserNames[id] = `User ${id}`;
            }
          } catch {
            fetchedUserNames[id] = `User ${id}`;
          }
        }));
        setUserNames(fetchedUserNames);

        // Fetch home names in parallel and cache them
        const fetchedHomeNames = {};
        await Promise.all(uniqueHomeIds.map(async (id) => {
          try {
            const res = await fetch(`https://back-end-1-wour.onrender.com/homes/${id}`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
              const homeData = await res.json();
              const home = homeData[0]; // API returns array
              fetchedHomeNames[id] = home?.name || `Home ${id}`;
            } else {
              fetchedHomeNames[id] = `Home ${id}`;
            }
          } catch {
            fetchedHomeNames[id] = `Home ${id}`;
          }
        }));
        setHomeNames(fetchedHomeNames);

        // Calculate analytics:
        // 1. Total visitors overall
        const total = data.reduce((acc, v) => acc + (v.number_of_visitors || 0), 0);
        setTotalVisitors(total);

        // 2. Find most visited home (sum visitors grouped by home_id)
        const visitorsPerHome = {};
        data.forEach(v => {
          if (v.home_id) {
            visitorsPerHome[v.home_id] = (visitorsPerHome[v.home_id] || 0) + (v.number_of_visitors || 0);
          }
        });

        const sortedHomes = Object.entries(visitorsPerHome).sort((a, b) => b[1] - a[1]);
        if (sortedHomes.length > 0) {
          const [homeId, count] = sortedHomes[0];
          setMostVisitedHome({ homeId, count });
        } else {
          setMostVisitedHome(null);
        }

      } catch (err) {
        console.error('Error fetching visitors:', err.message);
      }
    };

    if (token) {
      fetchVisits();
    }
  }, [token]);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Visitors Management</h2>

      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', marginTop: '1rem' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Phone Number</th>
            <th>Day to Visit</th>
            <th>Number of Visitors</th>
            <th>User</th>
            <th>Home</th>
          </tr>
        </thead>
        <tbody>
          {visits.length === 0 && (
            <tr><td colSpan="7" style={{ textAlign: 'center' }}>No visits found.</td></tr>
          )}
          {visits.map(visit => (
            <tr key={visit.id}>
              <td>{visit.id}</td>
              <td>{visit.full_name}</td>
              <td>{visit.phone_number}</td>
              <td>{new Date(visit.day_to_visit).toLocaleDateString()}</td>
              <td>{visit.number_of_visitors}</td>
              <td>{userNames[visit.user_id] || visit.user_id || 'N/A'}</td>
              <td>{homeNames[visit.home_id] || visit.home_id || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: 6 }}>
        <h3>Analytics</h3>
        <p><strong>Total Number of Visitors:</strong> {totalVisitors}</p>
        <p>
          <strong>Most Visited Home:</strong>{' '}
          {mostVisitedHome
            ? `${homeNames[mostVisitedHome.homeId] || `Home ${mostVisitedHome.homeId}`} (${mostVisitedHome.count} visitors)`
            : 'No data available'}
        </p>
      </div>
    </div>
  );
}

export default VisitorsManagement;
