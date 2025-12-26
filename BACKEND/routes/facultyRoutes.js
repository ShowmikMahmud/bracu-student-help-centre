const express = require('express');
const router = express.Router();
const facultyController = require('../controllers/facultyController');

// Get all faculty
router.get('/', facultyController.getAllFaculty);

// Search faculty
router.get('/search', facultyController.searchFaculty);

// Get faculty by department
router.get('/department/:department', facultyController.getFacultyByDepartment);

// Get faculty by initial
router.get('/:initial', facultyController.getFacultyByInitial);

// Add new faculty
router.post('/', facultyController.addFaculty);

// Add review to faculty
router.post('/:initial/reviews', facultyController.addReview);

// Get reviews for a faculty
router.get('/:initial/reviews', facultyController.getReviews);

module.exports = router;