const { fetchAllTopics } = require('../models/topics_models');

exports.getAllTopics = (req, res, next) => {
  console.log('im in the getAllTopics controller');

  fetchAllTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    });
};
