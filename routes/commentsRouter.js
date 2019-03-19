const commentsRouter = require('express').Router();
const { patchComments, deleteCommentsById } = require('../controllers/comments_controllers');
const { handle405 } = require('../errors/index');

commentsRouter.route('/:comments_id')
  .patch(patchComments)
  .delete(deleteCommentsById)
  .all(handle405);

module.exports = commentsRouter;
