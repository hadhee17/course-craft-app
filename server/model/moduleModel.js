const mongoose = require('mongoose');

const moduleSchema = mongoose.Schema({
  title: { type: String, required: true },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course', // matches the Course model
    required: true,
  },
  lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
  sequence: Number,
});

module.exports = mongoose.model('Module', moduleSchema);
