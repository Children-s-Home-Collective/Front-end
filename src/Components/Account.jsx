import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProfilePage from './Profilepage';
import LogoutButton from './LogoutButton';
import Managesystem from './Managesystem';
import AdminDashboard from './AdminDashboard';
import UserManagement from './UserManagement';

function Account() {
  const [activeSection, setActiveSection] = useState('Profile');
  const [userRole, setUserRole] = useState('');
  const [showManageDropdown, setShowManageDropdown] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserRole(parsedUser.role || '');
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
      }
    }
  }, []);

  const renderContent = () => {
    switch (activeSection) {
      case 'Profile':
        return <ProfilePage />;
      case 'Logout':
        return <LogoutButton />;
      case 'Manage':
        return <Managesystem />;
      case 'Dashboard':
        return <AdminDashboard />;
      default:
        return <p>Select an option.</p>;
    }
  };

  const toggleDropdown = () => {
    setShowManageDropdown(prev => !prev);
  };

  return (
    <div className="account-container">
      <div className="leftsetting">
        <ul>
          <li>
            <Link to="/homepage">Back to home page</Link>
          </li>

          <li onClick={() => setActiveSection('Profile')}>
            <img src='https://img.icons8.com/?size=48&id=20750&format=png' alt="Profile icon" />
            Profile
          </li>

          {userRole === 'admin' && (
            <>
              <li onClick={toggleDropdown}>
                <img src='https://img.icons8.com/?size=48&id=64633&format=png' alt="Manage icon" />
                Manage System
              </li>
              {showManageDropdown && (
                <ul className="dropdown">
                  <li onClick={() => setActiveSection('Dashboard')}>Dashboard</li>
                </ul>
              )}
            </>
          )}

          <li onClick={() => setActiveSection('Logout')}>
            <img src='https://img.icons8.com/?size=80&id=110469&format=png' alt="Logout icon" />
            Logout
          </li>
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
