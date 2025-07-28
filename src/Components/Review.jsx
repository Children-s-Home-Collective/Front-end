import React, { useEffect, useState } from 'react';

function Review({ name }) {
  const [matchingReview, setMatchingReview] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/comments');
        if (!response.ok) throw new Error('Failed to fetch reviews');

        const data = await response.json();

        const match = data.find((review) => review.name === name);
        setMatchingReview(match || null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [name]);
  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating || !comment) {
      alert('Please fill in both rating and comment.');
      return;
    }

  const newReview = { name, rating, comment };

    try {
       const response = await fetch('https://jsonplaceholder.typicode.com/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview)
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


  if (loading) return <p>Loading review...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='reviews'>
        <button>Add review<img src='https://img.icons8.com/?size=30&id=60953&format=png' /></button>
      {matchingReview ? (
        <div className='review'>
          <h3>Review for {matchingReview.name}</h3>
          <p><strong>Rating:</strong> {matchingReview.rating} / 5</p>
          <p><strong>Comment:</strong> {matchingReview.comment}</p>
        </div>
      ) : (
        <p>No review found </p>
      )}
      {showForm && (
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
          <button onClick={toggleForm}type="submit">Submit Review</button>
        </form>
      )}
    </div>
  );
}

export default Review;
