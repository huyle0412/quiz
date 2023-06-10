const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  options: [{
    type: String,
    required: true,
  }],
  answer: {
    type: String,
    required: true,
  },
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
