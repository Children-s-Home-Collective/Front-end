import React, { useState } from 'react';

function Visit() {
  const [visitData, setVisitData] = useState({
    day: '',
    visitors: '',
    name: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVisitData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    const { day, visitors, name, phone } = visitData;

    
    if (!day || !visitors || !name || !phone) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('https://your-api.com/visits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(visitData)
      });

      if (!response.ok) throw new Error('Failed to submit visit request');

      const result = await response.json();
      alert('Visit successfully scheduled!');
      console.log(result);

      
      setVisitData({
        day: '',
        visitors: '',
        name: '',
        phone: ''
      });
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className='visit'>
      <div className='visit1'>
         <img src='https://img.icons8.com/?size=48&id=Mjt9Tkm04cgv&format=png' />
         <p>Plan a Visit to our children’s home</p>
      </div>
     <div className='visitform'>
      <div className='visitday'>
        <label>Day of Visit: </label>
        <input
          type="date"
          name="day"
          value={visitData.day}
          onChange={handleChange}
          required
        />
      </div>

      <div className='visitors'>
        <label>Number of Visitors: </label>
        <input
          type="number"
          name="visitors"
          value={visitData.visitors}
          onChange={handleChange}
          required
        />
      </div>

      <div className='username'>
        <label>Your Name: </label>
        <input
          type="text"
          name="name"
          value={visitData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className='phonenumber'>
        <label>Phone Number: </label>
        <input
          type="tel"
          name="phone"
          value={visitData.phone}
          onChange={handleChange}
          required
        />
      </div>

      
      </div>
      <button onClick={handleSubmit}> Request Visit </button>
    </div>
  );
}

export default Visit;
