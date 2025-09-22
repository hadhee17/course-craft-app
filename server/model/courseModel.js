const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: String,
  instructor: String,

  price: {
    type: Number,
    required: [true, 'A course must have a price'],
    min: [0, 'Price must be positive'],
  },

  image: {
    type: String,
    required: [true, 'A course must have an image URL'],
  },

  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: [true, 'A course must have a difficulty level'],
  },

  rating: { type: Number, min: 0, max: 5 },

  modules: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Module' }, // ✅ multiple modules
  ],

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Course', courseSchema);
