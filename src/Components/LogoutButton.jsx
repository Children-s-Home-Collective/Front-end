import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';


function LogoutButton() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
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

  const handleLogout = async () => {
    const token = localStorage.getItem('access_token');

    try {
      const res = await fetch(`https://back-end-1-wour.onrender.com/users/${user.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const error = await res.json();
        console.error('Failed to delete user:', error.details || res.statusText);
      }
    } catch (err) {
      console.error('Error deleting user:', err.message);
    }

    localStorage.removeItem('access_token');
    navigate('/');
  };

  return (
    <div className='main-logout'>
      <p>
        Once you are logged out, your account will be deleted. If you're sure you want to proceed,
        click the button below.
      </p>
      <button onClick={handleLogout} className="logout-btn">
        Delete Account & Logout
      </button>
    </div>
  );
}

export default LogoutButton;
