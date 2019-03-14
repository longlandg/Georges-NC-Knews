const articlesRouter = require('express').Router();
const {
  getAllArticles, getAllCommentsByArticleId, postCommentOnArticle, deleteArticleById, postArticle, getArticleById, patchArticleById,
} = require('../controllers/articles_controllers');
const { handle405, handle404 } = require('../errors/index');

articlesRouter.route('/')
  .get(getAllArticles)
  .post(postArticle)
  .all(handle405);

articlesRouter.route('/:article_id')
  .get(getArticleById)
  .patch(patchArticleById)
  .delete(deleteArticleById);

articlesRouter.route('/:article_id/comments')
  .get(getAllCommentsByArticleId)
  .post(postCommentOnArticle);

module.exports = articlesRouter;
