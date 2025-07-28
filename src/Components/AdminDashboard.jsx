import React, { useState } from 'react';
import UsersManagement from './UsersManagement';
import HomesManagement from './HomesManagement';
import VolunteersManagement from './VolunteersManagement';
import AdminsManagement from './AdminsManagement';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Admin Management Dashboard</h1>

      <nav style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button onClick={() => setActiveTab('users')}>Users</button>
        <button onClick={() => setActiveTab('homes')}>Children's Homes</button>
        <button onClick={() => setActiveTab('volunteers')}>Volunteers</button>
        <button onClick={() => setActiveTab('admins')}>Admins</button>
      </nav>

      <div>
        {activeTab === 'users' && <UsersManagement />}
        {activeTab === 'homes' && <HomesManagement />}
        {activeTab === 'volunteers' && <VolunteersManagement />}
        {activeTab === 'admins' && <AdminsManagement />}
      </div>
    </div>
  );
};

export default AdminDashboard;
