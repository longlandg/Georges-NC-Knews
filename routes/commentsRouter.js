const commentsRouter = require('express').Router();
const { patchComments, deleteCommentsById } = require('../controllers/comments_controllers');

commentsRouter.route('/:comments_id')
  .patch(patchComments)
  .delete(deleteCommentsById);

module.exports = commentsRouter;
