const mongoose = require('mongoose');
const Faculty = require('./models/Faculty');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI);

const sampleFaculty = [
  {
    name: 'Dr. Md. Golam Rabiul Alam',
    initial: 'GRA',
    department: 'Computer Science and Engineering',
    designation: 'Professor',
    email: 'gra@bracu.ac.bd',
    officeRoom: 'UB 60401',
    courses: ['CSE110', 'CSE220', 'CSE230'],
    reviews: [
      {
        studentName: 'Anonymous',
        studentId: '20101XXX',
        courseCode: 'CSE110',
        rating: 5,
        comment: 'Excellent teacher! Very clear explanations and always helpful.',
        semester: 'Summer 2024'
      },
      {
        studentName: 'Anonymous',
        studentId: '20201XXX',
        courseCode: 'CSE220',
        rating: 4,
        comment: 'Good teaching style, but assignments are challenging.',
        semester: 'Fall 2024'
      }
    ]
  },
  {
    name: 'Dr. Md. Khalilur Rhaman',
    initial: 'MKR',
    department: 'Computer Science and Engineering',
    designation: 'Associate Professor',
    email: 'mkr@bracu.ac.bd',
    officeRoom: 'UB 60402',
    courses: ['CSE111', 'CSE221', 'CSE321'],
    reviews: [
      {
        studentName: 'Anonymous',
        studentId: '20301XXX',
        courseCode: 'CSE111',
        rating: 5,
        comment: 'Best teacher I have had. Makes complex topics easy to understand.',
        semester: 'Spring 2024'
      }
    ]
  },
  {
    name: 'Md. Ashraful Islam',
    initial: 'MAI',
    department: 'Computer Science and Engineering',
    designation: 'Lecturer',
    email: 'mai@bracu.ac.bd',
    officeRoom: 'UB 60403',
    courses: ['CSE250', 'CSE260'],
    reviews: [
      {
        studentName: 'Anonymous',
        studentId: '19101XXX',
        courseCode: 'CSE250',
        rating: 4,
        comment: 'Very organized and punctual. Course materials are well-prepared.',
        semester: 'Summer 2024'
      }
    ]
  },
  {
    name: 'Annajiat Alim Rasel',
    initial: 'AAR',
    department: 'Computer Science and Engineering',
    designation: 'Senior Lecturer',
    email: 'aar@bracu.ac.bd',
    officeRoom: 'UB 60404',
    courses: ['CSE470', 'CSE471'],
    reviews: [
      {
        studentName: 'Anonymous',
        studentId: '18201XXX',
        courseCode: 'CSE470',
        rating: 5,
        comment: 'Industry-focused approach. Very helpful for real-world applications.',
        semester: 'Fall 2024'
      }
    ]
  },
  {
    name: 'Dr. Sadia Sharmin',
    initial: 'SS',
    department: 'Computer Science and Engineering',
    designation: 'Assistant Professor',
    email: 'ss@bracu.ac.bd',
    officeRoom: 'UB 60405',
    courses: ['CSE330', 'CSE420'],
    reviews: [
      {
        studentName: 'Anonymous',
        studentId: '19301XXX',
        courseCode: 'CSE330',
        rating: 4,
        comment: 'Great at explaining algorithms. Office hours are very helpful.',
        semester: 'Spring 2024'
      }
    ]
  }
];

const seedFaculty = async () => {
  try {
    await Faculty.deleteMany({});
    
    for (let facultyData of sampleFaculty) {
      const faculty = new Faculty(facultyData);
      faculty.updateAverageRating();
      await faculty.save();
    }
    
    console.log('✅ Sample faculty data added successfully!');
    process.exit();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

seedFaculty();