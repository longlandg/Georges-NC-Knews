const usersRouter = require('express').Router();
const { getAllUsers, postUser, getUser } = require('../controllers/users_controllers');


usersRouter.route('/')
  .get(getAllUsers)
  .post(postUser);

usersRouter.route('/:username')
  .get(getUser);

module.exports = usersRouter;
