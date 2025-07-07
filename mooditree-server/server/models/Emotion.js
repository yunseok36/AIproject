const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
  title: String,
  name: String,
  year: String,
  image: String,
}, { _id: false });

const movieSchema = new mongoose.Schema({
  title: String,
  director: String,
  year: String,
  image: String,
}, { _id: false });

const emotionSchema = new mongoose.Schema({
  email: { type: String, required: true },
  emotion: String,
  label: String,
  date: { type: Date, default: Date.now },
  recommendations: {
    music: [musicSchema],
    movie: [movieSchema],
  }
});

module.exports = mongoose.model('Emotion', emotionSchema);
