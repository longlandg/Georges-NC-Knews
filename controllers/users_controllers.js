const { fetchAllUsers, addUser } = require('../models/users_models');

console.log('im in the users controller');

exports.getAllUsers = (req, res, next) => {
  fetchAllUsers()
    .then((users) => {
      res.status(200).send({ users });
    });
};

exports.postUser = (req, res, next) => {
  const userToPost = req.body;
  addUser(userToPost)
    .then(([user]) => {
    //   console.log(user)
      res.status(201).send({ user });
    });
};
