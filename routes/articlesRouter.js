const articlesRouter = require('express').Router();
const { getAllArticles, postArticle } = require('../controllers/articles_controllers');

articlesRouter.get('/', getAllArticles);
articlesRouter.post('/', postArticle);


module.exports = articlesRouter;
