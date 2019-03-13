const commentsRouter = require('express').Router();
const { patchComments } = require('../controllers/comments_controllers');


commentsRouter.patch('/:comment_id', patchComments);


module.exports = commentsRouter;
