const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bracu-help')
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.log('MongoDB Error:', err));

app.get('/', (req, res) => {
  res.send('BRACU Help Center Backend is Running');
});

const contactRoutes = require('./routes/contactRoutes');
app.use('/api/contacts', contactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server running on http://localhost:' + PORT);
});
