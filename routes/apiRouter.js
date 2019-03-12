const apiRouter = require('express').Router();
const topicsRouter = require('./topicsRouter.js');

apiRouter.use('/', topicsRouter);


module.exports = apiRouter;
