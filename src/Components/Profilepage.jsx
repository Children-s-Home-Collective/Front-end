import React from 'react';


function ProfilePage() {
  const user = {
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    role: 'User',
    avatar: 'https://i.pravatar.cc/150?img=47',
    bio: 'Frontend developer with a love for React and clean design.',
  };

  return (
    <div className='profile-container'>
      <div className="profile-card">
        <img className="avatar" src={user.avatar} alt="User avatar" />
        <h2>Username:{user.name}</h2>
        <p className="email">Email account:{user.email}</p>
        <p className="location">Role:{user.role}</p>
        <p className="bio">{user.bio}</p>
        <div className='profile-description'>
          <div className='inner'>
            <p>-------------------------------------------------------------------------</p>
            <img src='https://img.icons8.com/?size=48&id=37000&format=png' />
            <p>-------------------------------------------------------------------------</p>
          </div>
          <div>
            <p>Be part of our community and help children become what they dream of </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
