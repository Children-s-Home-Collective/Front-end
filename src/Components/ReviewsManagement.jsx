import React, { useEffect, useState } from 'react';

function ReviewsManagement() {
  const [reviews, setReviews] = useState([]);
  const [userNames, setUserNames] = useState({});
  const [homeNames, setHomeNames] = useState({});
  const [homeRatings, setHomeRatings] = useState({});
  const [topRatedHome, setTopRatedHome] = useState(null);
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch('https://back-end-1-wour.onrender.com/reviews/', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.details || 'Failed to fetch reviews');
        }

        const data = await res.json();
        setReviews(data);

        const uniqueUserIds = [...new Set(data.map(r => r.user_id).filter(Boolean))];
        const uniqueHomeIds = [...new Set(data.map(r => r.home_id).filter(Boolean))];

        // Fetch user names
        const fetchedUserNames = {};
        await Promise.all(uniqueUserIds.map(async (id) => {
          try {
            const res = await fetch(`https://back-end-1-wour.onrender.com/users/${id}`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
              const user = await res.json();
              fetchedUserNames[id] = user.name || `User ${id}`;
            } else {
              fetchedUserNames[id] = `User ${id}`;
            }
          } catch {
            fetchedUserNames[id] = `User ${id}`;
          }
        }));
        setUserNames(fetchedUserNames);

        // Fetch home names
        const fetchedHomeNames = {};
        await Promise.all(uniqueHomeIds.map(async (id) => {
          try {
            const res = await fetch(`https://back-end-1-wour.onrender.com/homes/${id}`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
              const homeData = await res.json();
              const home = homeData[0];
              fetchedHomeNames[id] = home?.name || `Home ${id}`;
            } else {
              fetchedHomeNames[id] = `Home ${id}`;
            }
          } catch {
            fetchedHomeNames[id] = `Home ${id}`;
          }
        }));
        setHomeNames(fetchedHomeNames);

        // Calculate average ratings per home
        const ratingSum = {};
        const ratingCount = {};

        data.forEach(r => {
          if (r.home_id && typeof r.rating === 'number') {
            ratingSum[r.home_id] = (ratingSum[r.home_id] || 0) + r.rating;
            ratingCount[r.home_id] = (ratingCount[r.home_id] || 0) + 1;
          }
        });

        const averages = {};
        Object.keys(ratingSum).forEach(homeId => {
          averages[homeId] = ratingSum[homeId] / ratingCount[homeId];
        });
        setHomeRatings(averages);

        // Determine top-rated home
        const sorted = Object.entries(averages).sort((a, b) => b[1] - a[1]);
        if (sorted.length > 0) {
          setTopRatedHome({ homeId: sorted[0][0], avg: sorted[0][1] });
        }

      } catch (err) {
        console.error('Error fetching reviews:', err.message);
      }
    };

    if (token) fetchReviews();
  }, [token]);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Reviews Management</h2>

      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', marginTop: '1rem' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Rating</th>
            <th>Comment</th>
            <th>User</th>
            <th>Home</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {reviews.length === 0 && (
            <tr><td colSpan="6" style={{ textAlign: 'center' }}>No reviews found.</td></tr>
          )}
          {reviews.map(r => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.rating}</td>
              <td>{r.comment || '-'}</td>
              <td>{userNames[r.user_id] || r.user_id}</td>
              <td>{homeNames[r.home_id] || r.home_id}</td>
              <td>{new Date(r.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Analytics */}
      <div style={{ marginTop: '2rem', borderTop: '1px solid #ccc', paddingTop: '1rem' }}>
        <h3>Analytics</h3>
        <ul>
          {Object.entries(homeRatings).map(([homeId, avg]) => (
            <li key={homeId}>
              {homeNames[homeId] || `Home ${homeId}`}: Average Rating {avg.toFixed(2)}
            </li>
          ))}
        </ul>

        {topRatedHome && (
          <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>
            Top Rated Home: {homeNames[topRatedHome.homeId] || `Home ${topRatedHome.homeId}`} (
            {topRatedHome.avg.toFixed(2)} stars)
          </p>
        )}
      </div>
    </div>
  );
}

export default ReviewsManagement;
