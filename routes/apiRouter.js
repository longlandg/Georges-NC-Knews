const apiRouter = require('express').Router();
const topicsRouter = require('./topicsRouter.js');
const articlesRouter = require('./articlesRouter.js');
const commentsRouter = require('./commentsRouter.js');
const usersRouter = require('./usersRouter.js');
const { getapi } = require('../controllers/api_controllers');
const { handle405 } = require('../errors/index');


apiRouter.use('/topics', topicsRouter);
apiRouter.use('/articles', articlesRouter);
apiRouter.use('/comments', commentsRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/topics', topicsRouter);
// apiRouter.use('/', topicsRouter);


apiRouter.route('/')
  .get(getapi)
  .all(handle405);

module.exports = apiRouter;
