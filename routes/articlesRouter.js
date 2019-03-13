const articlesRouter = require('express').Router();
const {
  getAllArticles, getAllCommentsByArticleId, postCommentOnArticle, deleteArticleById, postArticle, getArticleById, patchArticleById,
} = require('../controllers/articles_controllers');

articlesRouter.get('/', getAllArticles);
articlesRouter.post('/', postArticle);

articlesRouter.get('/:article_id', getArticleById);
articlesRouter.patch('/:article_id', patchArticleById);
articlesRouter.delete('/:article_id', deleteArticleById);

articlesRouter.get('/:article_id/comments', getAllCommentsByArticleId);
articlesRouter.post('/:article_id/comments', postCommentOnArticle);

module.exports = articlesRouter;
