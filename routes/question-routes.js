const express = require('express');
const router = express.Router();
const questionController = require('../controllers/question-controller');

// Routes for questions
router.get('/:topic', questionController.getAllQuestions);
router.post('/:topic', questionController.createQuestion);
router.put('/:id', questionController.updateQuestion);
router.delete('/:id', questionController.deleteQuestion);

module.exports = router;
