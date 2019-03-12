const topicsRouter = require('express').Router();
const { getAllTopics } = require('../controllers/topics_controller');

topicsRouter.get('/', getAllTopics);


module.exports = topicsRouter;
