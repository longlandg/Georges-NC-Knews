const articlesRouter = require('express').Router();
const { getAllArticles, postArticle, getArticleById } = require('../controllers/articles_controllers');

articlesRouter.get('/', getAllArticles);
articlesRouter.post('/', postArticle);

articlesRouter.get('/:article_id', getArticleById);

module.exports = articlesRouter;
