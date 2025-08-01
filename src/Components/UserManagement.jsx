import React, { useEffect, useState } from 'react';

const UserManagement = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [admins, setAdmins] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    phone_number: '',
    role: 'user'
  });
  const [deleteUserId, setDeleteUserId] = useState('');
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('access_token');

  useEffect(() => {
    fetchUsers();
    fetchDashboard();
    fetchAdmins();
  }, []);

  const fetchUsers = () => {
    fetch('https://back-end-1-wour.onrender.com/users/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch users');
        return res.json();
      })
      .then(data => {
        const regularUsers = data.filter(user => user.role === 'user');
        setUsers(regularUsers);
      })
      .catch(err => {
        console.error('Error fetching users:', err);
        setError('Failed to load users');
      });
  };

  const fetchDashboard = async () => {
    try {
      const res = await fetch('https://back-end-1-wour.onrender.com/admin/dashboard', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to fetch dashboard');
      const data = await res.json();
      setDashboardData(data);
    } catch (error) {
      console.error('Dashboard error:', error);
    }
  };

  const fetchAdmins = async () => {
    try {
      const res = await fetch('https://back-end-1-wour.onrender.com/admin/admins', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to fetch admins');
      const data = await res.json();
      setAdmins(data);
      setLoading(false);
    } catch (error) {
      console.error('Admin fetch error:', error);
      setLoading(false);
    }
  };

  const handlePromote = async (userId) => {
    try {
      const res = await fetch(`https://back-end-1-wour.onrender.com/admin/promote/${userId}`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      alert(data.message || data.error);
      fetchAdmins();
      fetchDashboard();
      fetchUsers();
    } catch (err) {
      console.error('Promotion error:', err);
    }
  };

  const handleDemote = async (userId) => {
    try {
      const res = await fetch(`https://back-end-1-wour.onrender.com/admin/demote/${userId}`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      alert(data.message || data.error);
      fetchAdmins();
      fetchDashboard();
    } catch (err) {
      console.error('Demotion error:', err);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    setMessage('Adding user...');

    try {
      const res = await fetch('https://back-end-1-wour.onrender.com/users/register', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('✅ User added successfully!');
        fetchUsers();
        setShowAddForm(false);
        setNewUser({ name: '', email: '', password: '', phone_number: '', role: 'user' });
      } else {
        setMessage(`❌ ${data.error || 'Failed to add user'}`);
      }
    } catch (err) {
      setMessage('❌ Error adding user');
    }
  };

  const handleDeleteUser = async (e) => {
    e.preventDefault();
    if (!deleteUserId) return;

    try {
      const res = await fetch(`https://back-end-1-wour.onrender.com/users/${deleteUserId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.ok) {
        setMessage('✅ User deleted');
        fetchUsers();
        setShowDeleteForm(false);
        setDeleteUserId('');
      } else {
        const data = await res.json();
        setMessage(`❌ ${data.error || 'Failed to delete user'}`);
      }
    } catch (err) {
      setMessage('❌ Error deleting user');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className='user-page' style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>User Management</h1>

      {dashboardData && (
        <div style={{ marginBottom: '20px' }}>
          <h2>Totals</h2>
          <p>Total Users: {dashboardData.total_users}</p>
          <p>Total Admins: {dashboardData.total_admins}</p>
          <p>Regular Users: {dashboardData.total_regular_users}</p>
        </div>
      )}

      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? '❌ Cancel Add User' : '➕ Add User'}
        </button>
        <button onClick={() => setShowDeleteForm(!showDeleteForm)} style={{ marginLeft: '10px' }}>
          {showDeleteForm ? '❌ Cancel Delete' : '🗑 Delete User'}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddUser} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}>
          <h3>Add New User</h3>
          <input type="text" name="name" placeholder="Name" value={newUser.name} onChange={e => setNewUser({ ...newUser, name: e.target.value })} required /><br />
          <input type="email" name="email" placeholder="Email" value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} required /><br />
          <input type="password" name="password" placeholder="Password" value={newUser.password} onChange={e => setNewUser({ ...newUser, password: e.target.value })} required /><br />
          <input type="text" name="phone_number" placeholder="Phone Number" value={newUser.phone_number} onChange={e => setNewUser({ ...newUser, phone_number: e.target.value })} /><br />
          <button type="submit">Submit</button>
        </form>
      )}

      {showDeleteForm && (
        <form onSubmit={handleDeleteUser} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}>
          <h3>Delete User</h3>
          <input type="number" placeholder="Enter user ID" value={deleteUserId} onChange={e => setDeleteUserId(e.target.value)} required />
          <button type="submit">Delete</button>
        </form>
      )}

      {message && <p style={{ color: message.startsWith('❌') ? 'red' : 'green' }}>{message}</p>}

      <h3>Current Admins</h3>
      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', marginBottom: '20px' , marginTop:'1rem'}}>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map(admin => (
            <tr key={admin.id}>
              <td>{admin.id}</td>
              <td>{admin.name}</td>
              <td>{admin.email}</td>
              <td>{admin.role}</td>
              <td>
                <button onClick={() => handleDemote(admin.id)}>Demote</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <h3>Promote User to Admin</h3>
        <input type="number" placeholder="Enter user ID" id="promoteUserId" />
        <button onClick={() => {
          const userId = document.getElementById('promoteUserId').value;
          if (userId) handlePromote(userId);
        }}>
          Promote
        </button>
      </div>

      <h2>All Regular Users</h2>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td><td>{user.name}</td><td>{user.email}</td><td>{user.phone_number}</td><td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserManagement;
