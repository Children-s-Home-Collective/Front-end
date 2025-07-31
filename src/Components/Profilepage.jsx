import React, { useEffect, useState } from 'react';

function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse user from localStorage:', e);
      }
    }
  }, []);

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className='profile-container'>
      <div className="profile-card">
        <img className="avatar" src='https://img.icons8.com/?size=50&id=7819&format=png' alt="User avatar" />
        <h2>Username: {user.name}</h2>
        <p className="email">Email account: {user.email}</p>
        <p className="location">Role: {user.role}</p>
        <p className="bio">Phone Number:{user.phone_number}</p>
        <div className='profile-description'>
          <div className='inner'>
            <p>-------------------------------------------------------------------------</p>
            <img src='https://img.icons8.com/?size=48&id=37000&format=png' alt="separator" />
            <p>-------------------------------------------------------------------------</p>
          </div>
          <div>
            <p>Be part of our community and help children become what they dream of</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
