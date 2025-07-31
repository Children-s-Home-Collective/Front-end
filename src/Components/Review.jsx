import React, { useEffect, useState } from 'react';

function Review({ name, homeid }) {
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    fetch(`https://back-end-1-wour.onrender.com/reviews/home/${homeid}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        setReviews(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Something went wrong while fetching data.');
        setLoading(false);
      });
  }, [homeid]);

  const toggleForm = () => {
    setShowForm(prev => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating || !comment) {
      alert('Please fill in both rating and comment.');
      return;
    }

    const newReview = {  rating, comment,  home_id: homeid   };
    const token = localStorage.getItem('access_token');

    try {
      const response = await fetch(`https://back-end-1-wour.onrender.com/reviews/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newReview),
      });

      if (!response.ok) throw new Error('Failed to submit review');

      alert('Thank you for your review!');
      setShowForm(false);
      setRating('');
      setComment('');
    } catch (err) {
      alert('Error submitting review.');
    }
  };

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='reviews'>
      <button onClick={toggleForm}>
        {showForm ? 'Cancel' : 'Add Review'}
        <img src='https://img.icons8.com/?size=30&id=60953&format=png' alt='review icon' />
      </button>

      {!showForm ? (
        reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div className='review' key={index}>
              <p><strong>Reviewer:</strong> {review.userName || 'Anonymous'}</p>
              <p><strong>Rating:</strong> {review.rating} / 5</p>
              <p><strong>Comment:</strong> {review.comment}</p>
            </div>
          ))
        ) : (
          <p>No review found for this children's home.</p>
        )
      ) : (
        <form onSubmit={handleSubmit} style={{ marginTop: '15px' }}>
          <div style={{ marginBottom: '10px' }}>
            <label>Rating (1–5): </label>
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Comment: </label><br />
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="4"
              cols="40"
              required
            />
          </div>
          <button type="submit">Submit Review</button>
        </form>
      )}
    </div>
  );
}

export default Review;
