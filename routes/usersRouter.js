const usersRouter = require('express').Router();
const { getAllUsers, postUser, getUser } = require('../controllers/users_controllers');
const { handle405 } = require('../errors/index');

usersRouter.route('/')
  .get(getAllUsers)
  .post(postUser)
  .all(handle405);

usersRouter.route('/:username')
  .get(getUser);

module.exports = usersRouter;
