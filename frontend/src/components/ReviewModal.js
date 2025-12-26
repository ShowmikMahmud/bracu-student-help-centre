import React, { useState } from 'react';
import './ReviewModal.css';

const ReviewModal = ({ faculty, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    studentName: '',
    studentId: '',
    courseCode: '',
    rating: 5,
    comment: '',
    semester: 'Fall 2024'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const renderStars = (rating) => {
    return [1, 2, 3, 4, 5].map((star) => (
      <span
        key={star}
        className={`star-input ${star <= rating ? 'filled' : ''}`}
        onClick={() => setFormData({ ...formData, rating: star })}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        
        <h2>Write a Review for {faculty.name}</h2>
        <p className="modal-subtitle">{faculty.initial} - {faculty.designation}</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Your Name (Optional - Anonymous by default)</label>
            <input
              type="text"
              name="studentName"
              placeholder="Anonymous"
              value={formData.studentName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Student ID *</label>
            <input
              type="text"
              name="studentId"
              placeholder="e.g., 20101XXX"
              value={formData.studentId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Course Code *</label>
              <input
                type="text"
                name="courseCode"
                placeholder="e.g., CSE470"
                value={formData.courseCode}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Semester *</label>
              <select
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                required
              >
                <option>Fall 2024</option>
                <option>Summer 2024</option>
                <option>Spring 2024</option>
                <option>Fall 2023</option>
                <option>Summer 2023</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Rating *</label>
            <div className="star-rating">
              {renderStars(formData.rating)}
              <span className="rating-value">{formData.rating}/5</span>
            </div>
          </div>

          <div className="form-group">
            <label>Your Review *</label>
            <textarea
              name="comment"
              rows="4"
              placeholder="Share your experience with this faculty member..."
              value={formData.comment}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;