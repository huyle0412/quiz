const Question = require('../Model/question-model');

exports.createQuestion = async (req, res) => {
  try {
    const { topic, description, alternatives } = req.body;

    const question = await Question.create({
      topic: topic,
      description: description,
      alternatives: alternatives,
    });

    return res.status(201).json(question);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

exports.getAllQuestion =async (req, res) => {
  try {
    const questions = await Question.find()
    return res.status(200).json(questions)
} catch (error) {
    return res.status(500).json({"error":error})
}
};
exports.getQuestionsTopic =async (req, res) => {
  try {
    const topic = req.params.topic;
    const questions = await Question.find({ topic });
    return res.status(200).json(questions);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getOneQuizQuestion =async (req, res) => {
  try {
    const _id = req.params.id 

    const question = await Question.findOne({_id})        
    if(!question){
        return res.status(404).json({})
    }else{
        return res.status(200).json(question)
    }
} catch (error) {
    return res.status(500).json({"error":error})
}
};

exports.updateQuestion =async (req, res) => {
  try {
    const _id = req.params.id;
    const { topic, description, alternatives } = req.body;

    let question = await Question.findOne({ _id });

    if (!question) {
      question = await Question.create({
        topic,
        description,
        alternatives,
      });
      return res.status(201).json(question);
    } else {
      question.topic = topic;
      question.description = description;
      question.alternatives = alternatives;
      await question.save();
      return res.status(200).json(question);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.deleteQuestion =async (req, res) => {
  try {
    const _id = req.params.id 

    const question = await Question.deleteOne({_id})

    if(question.deletedCount === 0){
        return res.status(404).json()
    }else{
        return res.status(204).json()
    }
} catch (error) {
    return res.status(500).json({"error":error})
}
};
exports.getAllTopics =async (req, res) => {
  try {
    const topics = await Question.aggregate([
      { $group: { _id: '$topic', count: { $sum: 1 } } },
      { $project: { _id: 0, topic: '$_id', count: 1 } },
    ]);
    return res.status(200).json(topics);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
