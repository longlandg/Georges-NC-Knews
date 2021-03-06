const { fetchAllTopics, addTopic } = require('../models/topics_models');


exports.getAllTopics = (req, res, next) => {
  fetchAllTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch(next);
};


exports.postTopic = (req, res, next) => {
  const topicToPost = req.body;

  addTopic(topicToPost)
    .then(([topic]) => {
      res.status(201).send({ topic });
    })
    .catch(next);
};
