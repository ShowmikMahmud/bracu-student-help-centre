import React, { useState } from 'react';

const FacultyDetailsModal = ({ faculty, onClose, onAddReview }) => {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewData, setReviewData] = useState({
    studentName: '',
    courseCode: '',
    semester: '',
    rating: 5,
    comment: ''
  });

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star filled">★</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">★</span>);
    }
    return stars;
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    onAddReview({ ...reviewData, date: new Date().toISOString() });
    setShowReviewModal(false);
    setReviewData({
      studentName: '',
      courseCode: '',
      semester: '',
      rating: 5,
      comment: ''
    });
  };

  return (
    <>
      <style>{`
        .details-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .details-content {
          background: white;
          border-radius: 12px;
          max-width: 700px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
          padding: 30px;
          position: relative;
        }

        .close-btn {
          position: absolute;
          top: 15px;
          right: 15px;
          background: none;
          border: none;
          font-size: 28px;
          cursor: pointer;
          color: #666;
          line-height: 1;
        }

        .close-btn:hover {
          color: #000;
        }

        .details-header {
          display: flex;
          gap: 20px;
          align-items: center;
          margin-bottom: 30px;
        }

        .faculty-avatar-large {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 32px;
          font-weight: bold;
        }

        .details-header h2 {
          margin: 0;
          font-size: 24px;
          color: #333;
        }

        .designation {
          margin: 5px 0;
          color: #666;
          font-size: 16px;
        }

        .department {
          margin: 0;
          color: #888;
          font-size: 14px;
        }

        .details-info {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 20px;
        }

        .info-item {
          margin-bottom: 10px;
          font-size: 15px;
        }

        .info-item:last-child {
          margin-bottom: 0;
        }

        .info-item strong {
          color: #333;
        }

        .overall-rating {
          text-align: center;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 8px;
          margin-bottom: 20px;
        }

        .stars-large {
          font-size: 32px;
          margin-bottom: 10px;
        }

        .star {
          color: #ddd;
        }

        .star.filled {
          color: #ffc107;
        }

        .star.half {
          background: linear-gradient(90deg, #ffc107 50%, #ddd 50%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .rating-text-large {
          display: block;
          font-size: 20px;
          font-weight: bold;
          color: #333;
          margin-bottom: 5px;
        }

        .review-count {
          color: #666;
          font-size: 14px;
        }

        .write-review-btn {
          width: 100%;
          padding: 12px;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          margin-bottom: 30px;
        }

        .write-review-btn:hover {
          background: #5568d3;
        }

        .reviews-section h3 {
          margin-bottom: 20px;
          color: #333;
        }

        .reviews-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .review-card {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 8px;
          border-left: 4px solid #667eea;
        }

        .review-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 10px;
        }

        .review-header strong {
          display: block;
          color: #333;
          margin-bottom: 5px;
        }

        .review-meta {
          font-size: 13px;
          color: #666;
        }

        .review-stars {
          font-size: 18px;
        }

        .review-comment {
          margin: 10px 0;
          color: #555;
          line-height: 1.6;
        }

        .review-date {
          font-size: 12px;
          color: #999;
        }

        .no-reviews {
          text-align: center;
          color: #999;
          padding: 40px;
        }

        .review-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1001;
        }

        .review-modal-content {
          background: white;
          border-radius: 12px;
          max-width: 500px;
          width: 90%;
          padding: 30px;
          position: relative;
        }

        .review-modal-content h2 {
          margin-bottom: 20px;
          color: #333;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          color: #333;
          font-weight: 600;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 14px;
          font-family: inherit;
        }

        .form-group textarea {
          min-height: 100px;
          resize: vertical;
        }

        .rating-input {
          display: flex;
          gap: 5px;
          font-size: 30px;
          cursor: pointer;
        }

        .rating-input span:hover,
        .rating-input span.active {
          color: #ffc107;
        }

        .modal-buttons {
          display: flex;
          gap: 10px;
          margin-top: 20px;
        }

        .modal-buttons button {
          flex: 1;
          padding: 12px;
          border: none;
          border-radius: 6px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
        }

        .submit-btn {
          background: #667eea;
          color: white;
        }

        .submit-btn:hover {
          background: #5568d3;
        }

        .cancel-btn {
          background: #e0e0e0;
          color: #333;
        }

        .cancel-btn:hover {
          background: #d0d0d0;
        }
      `}</style>

      <div className="details-overlay" onClick={onClose}>
        <div className="details-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-btn" onClick={onClose}>×</button>
          
          <div className="details-header">
            <div className="faculty-avatar-large">
              {faculty.initial}
            </div>
            <div>
              <h2>{faculty.name}</h2>
              <p className="designation">{faculty.designation}</p>
              <p className="department">{faculty.department}</p>
            </div>
          </div>

          <div className="details-info">
            <div className="info-item">
              <strong>📧 Email:</strong> {faculty.email}
            </div>
            {faculty.officeRoom && (
              <div className="info-item">
                <strong>🚪 Office:</strong> {faculty.officeRoom}
              </div>
            )}
            {faculty.courses && faculty.courses.length > 0 && (
              <div className="info-item">
                <strong>📚 Courses:</strong> {faculty.courses.join(', ')}
              </div>
            )}
          </div>

          <div className="overall-rating">
            <div className="stars-large">
              {renderStars(faculty.averageRating || 0)}
            </div>
            <span className="rating-text-large">
              {faculty.averageRating || 0} out of 5
            </span>
            <span className="review-count">
              Based on {faculty.totalReviews || 0} reviews
            </span>
          </div>

          <button 
            className="write-review-btn"
            onClick={() => setShowReviewModal(true)}
          >
            Write a Review
          </button>

          <div className="reviews-section">
            <h3>Student Reviews</h3>
            {faculty.reviews && faculty.reviews.length > 0 ? (
              <div className="reviews-list">
                {faculty.reviews.map((review, index) => (
                  <div key={index} className="review-card">
                    <div className="review-header">
                      <div>
                        <strong>{review.studentName || 'Anonymous'}</strong>
                        <span className="review-meta">
                          {review.courseCode} • {review.semester}
                        </span>
                      </div>
                      <div className="review-stars">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <p className="review-comment">{review.comment}</p>
                    <span className="review-date">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-reviews">No reviews yet. Be the first to review!</p>
            )}
          </div>
        </div>
      </div>

      {showReviewModal && (
        <div className="review-modal-overlay" onClick={() => setShowReviewModal(false)}>
          <div className="review-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowReviewModal(false)}>×</button>
            <h2>Write a Review for {faculty.name}</h2>
            
            <form onSubmit={handleSubmitReview}>
              <div className="form-group">
                <label>Your Name (Optional)</label>
                <input
                  type="text"
                  value={reviewData.studentName}
                  onChange={(e) => setReviewData({...reviewData, studentName: e.target.value})}
                  placeholder="Enter your name or leave blank for anonymous"
                />
              </div>

              <div className="form-group">
                <label>Course Code</label>
                <input
                  type="text"
                  value={reviewData.courseCode}
                  onChange={(e) => setReviewData({...reviewData, courseCode: e.target.value})}
                  placeholder="e.g., CSE101"
                  required
                />
              </div>

              <div className="form-group">
                <label>Semester</label>
                <input
                  type="text"
                  value={reviewData.semester}
                  onChange={(e) => setReviewData({...reviewData, semester: e.target.value})}
                  placeholder="e.g., Fall 2024"
                  required
                />
              </div>

              <div className="form-group">
                <label>Rating</label>
                <div className="rating-input">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={star <= reviewData.rating ? 'active' : ''}
                      onClick={() => setReviewData({...reviewData, rating: star})}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Your Review</label>
                <textarea
                  value={reviewData.comment}
                  onChange={(e) => setReviewData({...reviewData, comment: e.target.value})}
                  placeholder="Share your experience with this faculty member..."
                  required
                />
              </div>

              <div className="modal-buttons">
                <button type="button" className="cancel-btn" onClick={() => setShowReviewModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default FacultyDetailsModal;