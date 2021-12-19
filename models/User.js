const { Schema, model } = require('mongoose');

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  date: { type: String, required: true },
  name: { type: String, required: false },
  lastName: { type: String, required: false },
  job: { type: String, required: false },
  information: { type: String, required: false },
});

module.exports = model('User', schema);
