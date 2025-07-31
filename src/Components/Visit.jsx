import React, { useState } from 'react';

function Visit({ homeid }) {
  const [visitData, setVisitData] = useState({
    day_to_visit: '',
    number_of_visitors: '',
    full_name: '',
    phone_number: '',
    home_id: homeid 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVisitData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const token = localStorage.getItem('access_token');

  const handleSubmit = async () => {
    const { day_to_visit, number_of_visitors, full_name, phone_number } = visitData;

    if (!day_to_visit || !number_of_visitors || !full_name || !phone_number) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('https://back-end-1-wour.onrender.com/visitor/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(visitData)
      });

      if (!response.ok) throw new Error('Failed to submit visit request');

      const result = await response.json();
      alert('Visit successfully scheduled!');
      console.log(result);

      setVisitData({
        day_to_visit: '',
        number_of_visitors: '',
        full_name: '',
        phone_number: '',
        home_id: homeid 
      });
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className='visit'>
      <div className='visit1'>
        <img src='https://img.icons8.com/?size=48&id=Mjt9Tkm04cgv&format=png' alt="visit" />
        <p>Plan a Visit to our children’s home</p>
      </div>
      <div className='visitform'>
        <div className='visitday'>
          <label>Day of Visit: </label>
          <input
            type="date"
            name="day_to_visit"
            value={visitData.day_to_visit}
            onChange={handleChange}
            required
          />
        </div>

        <div className='visitors'>
          <label>Number of Visitors: </label>
          <input
            type="number"
            name="number_of_visitors"
            value={visitData.number_of_visitors}
            onChange={handleChange}
            required
          />
        </div>

        <div className='username'>
          <label>Your Name: </label>
          <input
            type="text"
            name="full_name"
            value={visitData.full_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className='phonenumber'>
          <label>Phone Number: </label>
          <input
            type="tel"
            name="phone_number"
            value={visitData.phone_number}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <button onClick={handleSubmit}>Request Visit</button>
    </div>
  );
}

export default Visit;
