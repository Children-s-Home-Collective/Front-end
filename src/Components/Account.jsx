import React, { useState } from 'react';

function Account() {
  const [activeSection, setActiveSection] = useState('Profile');

  const renderContent = () => {
    switch (activeSection) {
      case 'Profile':
        return <p>Welcome to your profile. Here are your details.</p>;
      case 'Settings':
        return <p>Adjust your settings here.</p>;
      case 'Logout':
        return <p>You have been logged out.</p>;
      default:
        return <p>Select an option.</p>;
    }
  };

  return (
    <div className="account-container">
      <div className="leftsetting">
        <ul>
          <li onClick={() => setActiveSection('Profile')}>Profile</li>
          <li onClick={() => setActiveSection('Settings')}>Settings</li>
          <li onClick={() => setActiveSection('Logout')}>Logout</li>
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
