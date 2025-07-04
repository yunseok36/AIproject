const mongoose = require('mongoose');
const emotionSchema = new mongoose.Schema({
  email: String,
  emotion: String,
  label: String,
  date: String,
});
module.exports = mongoose.model('Emotion', emotionSchema);
