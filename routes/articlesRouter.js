const articlesRouter = require('express').Router();
const {
  getAllArticles, postArticle, getArticleById, patchArticleById,
} = require('../controllers/articles_controllers');

articlesRouter.get('/', getAllArticles);
articlesRouter.post('/', postArticle);

articlesRouter.get('/:article_id', getArticleById);
articlesRouter.patch('/:article_id', patchArticleById);

module.exports = articlesRouter;
