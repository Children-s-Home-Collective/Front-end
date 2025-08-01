import React,{useState} from 'react'

function Donate({homeid}) {
  const [selected, setSelected] = useState('');
  const [amount, setAmount] = useState('');

  const handleCheck = (value) => {
    setSelected((prev) => (prev === value ? '' : value));
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('access_token');
    if (!selected || !amount) {
      alert("Please select a donation type and enter an amount.");
      return;
    }

    const donationData = {
      donation_type: selected,
      amount: parseFloat(amount),
      home_id:homeid,
    };
    try {
      const response = await fetch('https://back-end-1-wour.onrender.com/donations/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(donationData),
      });

      if (!response.ok) {
        throw new Error('Something went wrong with the request.');
      }

      const result = await response.json();
      alert(`Thank you! Your ${selected} donation of $${amount} was successful.`);
    } catch (error) {
      console.error('Error submitting donation:', error);
      alert('There was an error submitting your donation. Please try again.');
    }
  };
  return (
    <div className='donate'>
        <img src='https://img.icons8.com/?size=64&id=46478&format=png'/>
        <p>Support our children’s home as each donation will make a difference</p>
      <div className='donationtype'>
        <p>Donation type</p>
        <label style={{ marginRight: '20px' }}>
          <input type="checkbox" checked={selected === 'one-time'} onChange={() => handleCheck('one-time')}/> One-time
        </label>

        <label>
          <input type="checkbox" checked={selected === 'monthly'} onChange={() => handleCheck('monthly')}/>Monthly
        </label>
      </div>
      <div className='amount'>
        <label>Enter amount you wish to donate <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}/></label>
      </div>
      <button onClick={handleSubmit}>Donate</button>
      
      </div>
  )
}

export default Donate