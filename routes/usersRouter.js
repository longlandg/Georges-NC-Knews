const usersRouter = require('express').Router();
const { getAllUsers, postUser, getUser } = require('../controllers/users_controllers');

usersRouter.get('/', getAllUsers);
usersRouter.post('/', postUser);

usersRouter.get('/:username', getUser);

module.exports = usersRouter;
