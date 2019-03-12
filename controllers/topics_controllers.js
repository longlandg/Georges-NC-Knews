const { fetchAllTopics, addTopic } = require('../models/topics_models');

console.log('im in the getAllTopics controller');

exports.getAllTopics = (req, res, next) => {
  fetchAllTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    });
};


exports.postTopic = (req, res, next) => {
  const topicToPost = req.body;
  addTopic(topicToPost)
    .then(([topic]) => {
      res.status(201).send({ topic });
    });
  // .catch((err) => {
  //   next(err);
  // });
};
