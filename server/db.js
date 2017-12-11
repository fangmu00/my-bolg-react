const mongoose = require('mongoose');

const db = mongoose.createConnection('mongodb://127.0.0.1:27017/db');

db.on('error', (error) => {
  console.log(error);
}).once('open', () => {
  console.log('The database has connected.');
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  createDate: {
    type: String,
    default: new Date(),
  },
  lastLoginDate: {
    type: Date,
  },
});

module.exports = {
  user: db.model('user', userSchema),
};
