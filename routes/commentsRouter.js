const commentsRouter = require('express').Router();
const { patchComments, deleteComments } = require('../controllers/comments_controllers');


commentsRouter.patch('/:comments_id', patchComments);
// commentsRouter.delete('/:comments_id', deleteComments);

module.exports = commentsRouter;
