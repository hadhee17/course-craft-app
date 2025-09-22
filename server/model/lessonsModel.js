const mongoose = require('mongoose');

const lessonSchema = mongoose.Schema({
  title: { type: String, required: true },

  module: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Module', // ✅ belongs to one module
    required: true,
  },

  content: String,
  duration: Number, // in minutes
});

module.exports = mongoose.model('Lesson', lessonSchema);
