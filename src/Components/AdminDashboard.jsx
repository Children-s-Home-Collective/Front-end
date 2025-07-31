import React, { useState } from 'react';
import UserManagement from './UserManagement';
import HomesManagement from './HomesManagement';
import VolunteersManagement from './VolunteersManagement';
import DonationsManagement from './DonationsManagement';
import VisitorsManagement from './VisitorsManagement';
import ReviewsManagement from './ReviewsManagement';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Admin Management Dashboard</h1>

      <nav style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button onClick={() => setActiveTab('users')}>Users</button>
        <button onClick={() => setActiveTab('homes')}>Children's Homes</button>
        <button onClick={() => setActiveTab('volunteers')}>Volunteers</button>
        <button onClick={() => setActiveTab('donations')}>Donations</button>
        <button onClick={() => setActiveTab('visits')}>Visitors</button>
        <button onClick={() => setActiveTab('reviews')}>Reviews</button>
      </nav>

      <div>
        {activeTab === 'users' && <UserManagement />}
        {activeTab === 'homes' && <HomesManagement />}
        {activeTab === 'volunteers' && <VolunteersManagement />}
        {activeTab=== 'donations' && <DonationsManagement />}
        {activeTab=== 'visits' && <VisitorsManagement />}
        {activeTab=== 'reviews' && <ReviewsManagement />}
      </div>
    </div>
  );
};

export default AdminDashboard;
