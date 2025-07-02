const mongoose = require('mongoose');
const emotionSchema = new mongoose.Schema({
  email: { type: String, required: true },
  emotion: { type: String, required: true },
  label: { type: String, required: true },
  date: { type: String, required: true },
});
module.exports = mongoose.model('Emotion', emotionSchema);
