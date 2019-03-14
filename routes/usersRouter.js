const usersRouter = require('express').Router();
const { getAllUsers } = require('../controllers/users_controllers');

usersRouter.get('/', getAllUsers);


module.exports = usersRouter;
