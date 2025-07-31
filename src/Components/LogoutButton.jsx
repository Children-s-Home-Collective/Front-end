import React from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className='main-logout'>
    <p>Once you are logged out you will not have access to the system unless you sign up again.If you are sure you want to log out Press the button below</p>
    <button onClick={handleLogout} className="logout-btn">
      Logout
    </button>
    
    </div>

  );
}

export default LogoutButton;
