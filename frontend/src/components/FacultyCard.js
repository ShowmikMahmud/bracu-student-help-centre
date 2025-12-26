import React from 'react';
import './FacultyCard.css';

const FacultyCard = ({ faculty, onViewDetails }) => {
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

  return (
    <div className="faculty-card">
      <div className="faculty-header">
        <div className="faculty-avatar">
          {faculty.initial}
        </div>
        <div className="faculty-info">
          <h3>{faculty.name}</h3>
          <p className="designation">{faculty.designation}</p>
          <p className="department">{faculty.department}</p>
        </div>
      </div>

      <div className="faculty-details">
        <p><strong>📧 Email:</strong> {faculty.email}</p>
        {faculty.officeRoom && (
          <p><strong>🚪 Office:</strong> {faculty.officeRoom}</p>
        )}
        {faculty.courses && faculty.courses.length > 0 && (
          <p><strong>📚 Courses:</strong> {faculty.courses.join(', ')}</p>
        )}
      </div>

      <div className="faculty-rating">
        <div className="stars">
          {renderStars(faculty.averageRating || 0)}
        </div>
        <span className="rating-text">
          {faculty.averageRating || 0} ({faculty.totalReviews || 0} reviews)
        </span>
      </div>

      <button 
        className="view-details-btn"
        onClick={() => onViewDetails(faculty)}
      >
        View Details & Reviews
      </button>
    </div>
  );
};

export default FacultyCard;