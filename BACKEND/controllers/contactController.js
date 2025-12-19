const Contact = require('../models/Contact');

exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ department: 1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

exports.getContactsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const contacts = await Contact.find({ category });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

exports.addContact = async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    res.status(400).json({ message: 'Error adding contact', error: error.message });
  }
};

exports.searchContacts = async (req, res) => {
  try {
    const { query } = req.query;
    const contacts = await Contact.find({
      $or: [
        { department: { $regex: query, $options: 'i' } },
        { location: { $regex: query, $options: 'i' } }
      ]
    });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Search Error', error: error.message });
  }
};