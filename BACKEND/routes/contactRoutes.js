const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.get('/', contactController.getAllContacts);
router.get('/category/:category', contactController.getContactsByCategory);
router.get('/search', contactController.searchContacts);
router.post('/', contactController.addContact);

module.exports = router;