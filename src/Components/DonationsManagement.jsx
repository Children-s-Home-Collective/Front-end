import React, { useEffect, useState } from 'react';

function DonationsManagement() {
  const [donations, setDonations] = useState([]);
  const [homeTotals, setHomeTotals] = useState({});
  const [homeInNeed, setHomeInNeed] = useState(null);
  const [userNames, setUserNames] = useState({});
  const [homeNames, setHomeNames] = useState({});
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await fetch('https://back-end-1-wour.onrender.com/donations/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.details || 'Failed to fetch donations');
        }

        const data = await res.json();
        setDonations(data);

        // Calculate totals per home_id
        const totals = {};
        data.forEach(d => {
          const homeId = d.home_id || 'Unknown';
          totals[homeId] = (totals[homeId] || 0) + (d.amount || 0);
        });
        setHomeTotals(totals);

        // Find home in need (lowest total)
        const sorted = Object.entries(totals).sort((a, b) => a[1] - b[1]);
        if (sorted.length > 0) {
          setHomeInNeed({ home_id: sorted[0][0], total: sorted[0][1] });
        }

        // Fetch all unique user names
        const uniqueUserIds = [...new Set(data.map(d => d.user_id).filter(Boolean))];
        const uniqueHomeIds = [...new Set(data.map(d => d.home_id).filter(Boolean))];

        // Fetch user names in parallel and cache them
        const fetchedUserNames = {};
        await Promise.all(uniqueUserIds.map(async (id) => {
          try {
            const res = await fetch(`https://back-end-1-wour.onrender.com/users/${id}`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
              const userData = await res.json();
              // If userData is an object with a name field:
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
              const home = homeData[0]; // <-- Fix: access first item from array
              fetchedHomeNames[id] = home?.name || `Home ${id}`;
            } else {
              fetchedHomeNames[id] = `Home ${id}`;
            }
          } catch {
            fetchedHomeNames[id] = `Home ${id}`;
          }
        }));
        setHomeNames(fetchedHomeNames);

      } catch (err) {
        console.error('Error fetching donations:', err.message);
      }
    };

    if (token) fetchDonations();
  }, [token]);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Donations Management</h2>

      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', marginTop: '1rem' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Home</th>
            <th>Donor</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((donation) => (
            <tr key={donation.id}>
              <td>{donation.id}</td>
              <td>${donation.amount}</td>
              <td>{donation.donation_type}</td>
              <td>{homeNames[donation.home_id] || donation.home_id || 'N/A'}</td>
              <td>{userNames[donation.user_id] || donation.user_id || 'N/A'}</td>
              <td>{new Date(donation.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: '2rem' }}>Total Donations Per Home</h3>
      <ul>
        {Object.entries(homeTotals).map(([homeId, total]) => (
          <li key={homeId}>
            {homeNames[homeId] || `Home ${homeId}`}: ${total.toFixed(2)}
          </li>
        ))}
      </ul>

      {homeInNeed && (
        <div style={{ marginTop: '1rem',  padding: '1rem', borderRadius: '5px' }}>
          <strong>Home in most need:</strong> {homeNames[homeInNeed.home_id] || `Home ${homeInNeed.home_id}`} with only ${homeInNeed.total.toFixed(2)} in donations.
        </div>
      )}
    </div>
  );
}

export default DonationsManagement;
