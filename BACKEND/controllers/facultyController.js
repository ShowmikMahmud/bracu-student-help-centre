const Faculty = require('../models/Faculty');

// Get all faculty
exports.getAllFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.find().sort({ name: 1 });
    res.json(faculty);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Get faculty by initial
exports.getFacultyByInitial = async (req, res) => {
  try {
    const { initial } = req.params;
    const faculty = await Faculty.findOne({ initial: initial.toUpperCase() });
    
    if (!faculty) {
      return res.status(404).json({ message: 'Faculty not found' });
    }
    
    res.json(faculty);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Get faculty by department
exports.getFacultyByDepartment = async (req, res) => {
  try {
    const { department } = req.params;
    const faculty = await Faculty.find({ department });
    res.json(faculty);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Search faculty
exports.searchFaculty = async (req, res) => {
  try {
    const { query } = req.query;
    const faculty = await Faculty.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { initial: { $regex: query, $options: 'i' } },
        { department: { $regex: query, $options: 'i' } }
      ]
    });
    res.json(faculty);
  } catch (error) {
    res.status(500).json({ message: 'Search Error', error: error.message });
  }
};

// Add new faculty (admin only)
exports.addFaculty = async (req, res) => {
  try {
    const newFaculty = new Faculty(req.body);
    const savedFaculty = await newFaculty.save();
    res.status(201).json(savedFaculty);
  } catch (error) {
    res.status(400).json({ message: 'Error adding faculty', error: error.message });
  }
};

// Add review to faculty
exports.addReview = async (req, res) => {
  try {
    const { initial } = req.params;
    const { studentName, studentId, courseCode, rating, comment, semester } = req.body;
    
    const faculty = await Faculty.findOne({ initial: initial.toUpperCase() });
    
    if (!faculty) {
      return res.status(404).json({ message: 'Faculty not found' });
    }
    
    // Add review
    faculty.reviews.push({
      studentName,
      studentId,
      courseCode,
      rating,
      comment,
      semester
    });
    
    // Update average rating
    faculty.updateAverageRating();
    
    await faculty.save();
    res.status(201).json(faculty);
  } catch (error) {
    res.status(400).json({ message: 'Error adding review', error: error.message });
  }
};

// Get reviews for a faculty
exports.getReviews = async (req, res) => {
  try {
    const { initial } = req.params;
    const faculty = await Faculty.findOne({ initial: initial.toUpperCase() });
    
    if (!faculty) {
      return res.status(404).json({ message: 'Faculty not found' });
    }
    
    res.json(faculty.reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};