import React, { useState } from 'react';

const ReviewSection = () => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleReviewSubmit = (event) => {
    event.preventDefault();
    console.log('Rating:', rating);
    console.log('Review Text:', reviewText);
    setRating(0);
    setReviewText('');
  };

  return (
    <div>
      <div>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => handleStarClick(star)}
            style={{ cursor: 'pointer', color: star <= rating ? 'gold' : 'gray' }}
          >
            &#9733;
          </span>
        ))}
      </div>
      <form onSubmit={handleReviewSubmit}>
        <textarea
          value={reviewText}
          onChange={(event) => setReviewText(event.target.value)}
          placeholder="Write your review..."
          rows={4}
          cols={50}
          required
        />
        <br />
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default ReviewSection;