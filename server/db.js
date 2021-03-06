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
    type: Number,
    default: new Date().getTime(),
  },
  lastLoginDate: {
    type: Number,
    default: new Date().getTime(),
  },
});

const articleSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  type: {
    type: String,
  },
  status: {
    type: String,
  },
  createDate: {
    type: Number,
    default: new Date().getTime(),
  },
  updateTime: {
    type: Number,
    default: new Date().getTime(),
  },
  content: {
    type: String,
  },
  autherId: {
    type: String,
  },
});

module.exports = {
  user: db.model('user', userSchema),
  article: db.model('article', articleSchema),
};
