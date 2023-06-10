const Question = require('../Model/question-model');

// Controller for getting all questions of a specific topic
exports.getAllQuestions = async (req, res) => {
  try {
    const topic = req.params.topic;
    const questions = await Question.find({ topic });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller for creating a new question for a specific topic
exports.createQuestion = async (req, res) => {
  try {
    const topic = req.params.topic;
    const questionData = req.body;
    const question = new Question({ ...questionData, topic });
    await question.save();
    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller for updating a question of a specific topic
exports.updateQuestion = async (req, res) => {
  try {
    const questionId = req.params.id;
    const questionData = req.body;
    const question = await Question.findByIdAndUpdate(questionId, questionData, { new: true });
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.json(question);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller for deleting a question of a specific topic
exports.deleteQuestion = async (req, res) => {
  try {
    const questionId = req.params.id;
    const question = await Question.findByIdAndDelete(questionId);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.json({ message: 'Question deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
