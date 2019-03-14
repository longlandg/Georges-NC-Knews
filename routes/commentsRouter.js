const commentsRouter = require('express').Router();
const { patchComments } = require('../controllers/comments_controllers');


commentsRouter.patch('/:comments_id', patchComments);


module.exports = commentsRouter;
