const express = require('express');
const router = express.Router();
const questionController = require('../controllers/question-controller');
const Question = require('../Model/question-model');


router.post('/questions', questionController.createQuestion);
router.get('/questions', questionController.getAllQuestion);
router.get('/questions/:topic', questionController.getQuestionsTopic);
router.get('/questions/:topic/:id', questionController.getOneQuizQuestion);
router.put('/questions/:topic/:id', questionController.updateQuestion);
router.delete('/questions/:topic/:id', questionController.deleteQuestion);
router.get('/topics', questionController.getAllTopics);








module.exports = router;
