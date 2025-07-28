import React, { useEffect, useState } from 'react';

const FundingGoal = () => {
  const [totalContributed, setTotalContributed] = useState(null);
  const monthlyExpenses = 50000;

  useEffect(() => {
    // Replace this URL with your actual API endpoint
    fetch('https://api.example.com/funding/total-contributed')
      .then(response => response.json())
      .then(data => {
        setTotalContributed(data.total); // Assume the API returns: { total: 43000 }
      })
      .catch(error => {
        console.error('Error fetching funding data:', error);
        setTotalContributed(0); // fallback
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
      border:'2px solid black',
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
