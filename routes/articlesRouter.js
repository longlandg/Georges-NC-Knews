const articlesRouter = require('express').Router();
const {
  getAllArticles, deleteArticleById, postArticle, getArticleById, patchArticleById,
} = require('../controllers/articles_controllers');

articlesRouter.get('/', getAllArticles);
articlesRouter.post('/', postArticle);

articlesRouter.get('/:article_id', getArticleById);
articlesRouter.patch('/:article_id', patchArticleById);
articlesRouter.delete('/:article_id', deleteArticleById);

module.exports = articlesRouter;
