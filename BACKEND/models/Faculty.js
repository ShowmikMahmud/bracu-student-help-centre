const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true
  },
  studentId: {
    type: String,
    required: true
  },
  courseCode: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true
  },
  semester: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const FacultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  initial: {
    type: String,
    required: true,
    unique: true
  },
  department: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  officeRoom: {
    type: String
  },
  courses: [{
    type: String
  }],
  averageRating: {
    type: Number,
    default: 0
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  reviews: [ReviewSchema]
}, {
  timestamps: true
});

// Update average rating whenever a review is added
FacultySchema.methods.updateAverageRating = function() {
  if (this.reviews.length > 0) {
    const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    this.averageRating = (sum / this.reviews.length).toFixed(1);
    this.totalReviews = this.reviews.length;
  } else {
    this.averageRating = 0;
    this.totalReviews = 0;
  }
};

module.exports = mongoose.model('Faculty', FacultySchema);