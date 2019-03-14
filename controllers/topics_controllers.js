const { fetchAllTopics, addTopic } = require('../models/topics_models');
const { georgeErrors } = require('../controllers/articles_controllers');


console.log('im in the getAllTopics controller');

exports.getAllTopics = (req, res, next) => {
  fetchAllTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch((err) => {
      next(err);
    });
};


exports.postTopic = (req, res, next) => {
  const topicToPost = req.body;
  addTopic(topicToPost)
    .then(([topic]) => {
      res.status(201).send({ topic });
    })
    .catch((err) => {
      next(err);
    });
};
