const mongoose = require('mongoose');
const Contact = require('./models/Contact');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI);

const sampleContacts = [
  {
    department: 'Registrar Office',
    category: 'Academic',
    phone: '02-9844051-7 Ext: 4023',
    email: 'registrar@bracu.ac.bd',
    location: 'UB Building, 5th Floor',
    officeHours: 'Sun-Thu: 9:00 AM - 5:00 PM'
  },
  {
    department: 'Admission Office',
    category: 'Administrative',
    phone: '09666778800',
    email: 'admission@bracu.ac.bd',
    location: 'UB Building, Ground Floor',
    officeHours: 'Sun-Thu: 9:00 AM - 5:00 PM'
  },
  {
    department: 'Student Affairs',
    category: 'Student Services',
    phone: '02-9844051-7 Ext: 4060',
    email: 'osa@bracu.ac.bd',
    location: 'Student Center',
    officeHours: 'Sun-Thu: 9:00 AM - 5:00 PM'
  },
  {
    department: 'Emergency Medical',
    category: 'Emergency',
    phone: '02-9844051-7 Ext: 8888',
    email: 'medical@bracu.ac.bd',
    location: 'UB Building, Ground Floor',
    officeHours: '24/7'
  },
  {
    department: 'Library',
    category: 'Academic',
    phone: '02-9844051-7 Ext: 4028',
    email: 'library@bracu.ac.bd',
    location: 'Library Building',
    officeHours: 'Sun-Thu: 9:00 AM - 9:00 PM'
  }
];

const seedDatabase = async () => {
  try {
    await Contact.deleteMany({});
    await Contact.insertMany(sampleContacts);
    console.log('Sample data added successfully!');
    process.exit();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

seedDatabase();