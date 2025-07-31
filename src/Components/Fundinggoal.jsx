import React, { useEffect, useState } from 'react';

const FundingGoal = ({ homeid }) => {
  const [totalContributed, setTotalContributed] = useState(null);
  const monthlyExpenses = 50000;

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    fetch(`https://back-end-1-wour.onrender.com/donations/home/${homeid}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type':'application/json'
      }
    })
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch donations');
        return response.json();
      })
      .then(data => {
        const total = data.reduce((sum, donation) => sum + (donation.amount || 0), 0);
        setTotalContributed(total);
      })
      .catch(error => {
        console.error('Error fetching donation data:', error);
        setTotalContributed(0);
      });
  }, []);

  const remainingAmount = totalContributed !== null
    ? Math.max(monthlyExpenses - totalContributed, 0)
    : 0;

  const percentage = totalContributed !== null
    ? Math.min((totalContributed / monthlyExpenses) * 100, 100).toFixed(0)
    : 0;

  return (
    <div style={{
      width: '400px',
      backgroundColor: '#EEECFB',
      padding: '20px',
      border: '2px solid black',
      borderRadius: '10px',
      fontFamily: 'sans-serif',
      color: '#333'
    }}>
      <h2>Our Funding Goal</h2>

      {totalContributed === null ? (
        <p>Loading funding data...</p>
      ) : (
        <>
          <p><strong>Total contributed:</strong> ${totalContributed.toLocaleString()}</p>
          <p><strong>Our Monthly Expenses:</strong> ${monthlyExpenses.toLocaleString()}</p>
          <p><strong>Remaining Amount:</strong> ${remainingAmount.toLocaleString()}</p>

          <div style={{ marginTop: '15px' }}>
            <div style={{
              height: '20px',
              background: '#ddd',
              borderRadius: '10px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${percentage}%`,
                height: '100%',
                background: 'linear-gradient(to right, #4caf50, #81c784)',
                transition: 'width 0.5s ease'
              }}></div>
            </div>
            <p style={{ marginTop: '5px' }}>
              <strong>{percentage}%</strong> of monthly goal achieved
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default FundingGoal;
