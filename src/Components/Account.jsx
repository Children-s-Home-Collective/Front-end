import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfilePage from './Profilepage';
import LogoutButton from './LogoutButton';

function Account() {
  const [activeSection, setActiveSection] = useState('Profile');

  const renderContent = () => {
    switch (activeSection) {
      case 'Profile':
        return <ProfilePage />;
      case 'Logout':
        return <LogoutButton /> ;
      default:
        return <p>Select an option.</p>;
    }
  };

  return (
    <div className="account-container">
      <div className="leftsetting">
        <ul>
          <li><Link to="/homepage">Back to home page</Link></li>
          <li onClick={() => setActiveSection('Profile')}><img src='https://img.icons8.com/?size=48&id=20750&format=png' />Profile</li>
          <li onClick={() => setActiveSection('Logout')}><img src='https://img.icons8.com/?size=80&id=110469&format=png' />Logout</li>
        </ul>
      </div>

      <div className="rightsetting">
        <h2>{activeSection}</h2>
        {renderContent()}
      </div>
    </div>
  );
}

export default Account;
