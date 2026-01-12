const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.json());

mongoose
  .connect('mongodb://localhost:27017/userdb')
  .then(() => console.log('User DB connected'))
  .catch(err => console.error(err));

app.use('/auth', authRoutes);

app.listen(5001, () => {
  console.log('User Service running on port 5001');
});
