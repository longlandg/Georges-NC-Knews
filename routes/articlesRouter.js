const articlesRouter = require('express').Router();
const { getAllArticles } = require('../controllers/articles_controllers');

articlesRouter.get('/', getAllArticles);


module.exports = articlesRouter;
