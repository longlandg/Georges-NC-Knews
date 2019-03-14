const commentsRouter = require('express').Router();
const { patchComments, deleteCommentsById } = require('../controllers/comments_controllers');


commentsRouter.patch('/:comments_id', patchComments);
commentsRouter.delete('/:comments_id', deleteCommentsById);

module.exports = commentsRouter;
