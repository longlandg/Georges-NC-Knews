const { fetchAllTopics } = require('../models/topics_models');

console.log('im in the getAllTopics controller');

exports.getAllTopics = (req, res, next) => {
  fetchAllTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    });
};
