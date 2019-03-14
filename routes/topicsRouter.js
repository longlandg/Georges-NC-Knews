const topicsRouter = require('express').Router();
const { getAllTopics, postTopic } = require('../controllers/topics_controllers');
const { handle405 } = require('../errors/index');

topicsRouter.route('/')
  .get(getAllTopics)
  .post(postTopic)
  .all(handle405);


module.exports = topicsRouter;
