const { fetchAllUsers, addUser, fetchUser } = require('../models/users_models');

exports.getAllUsers = (req, res, next) => {
  fetchAllUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch(next);
};

exports.postUser = (req, res, next) => {
  const userToPost = req.body;
  addUser(userToPost)
    .then(([user]) => {
      res.status(201).send({ user });
    })
    .catch(next);
};

exports.getUser = (req, res, next) => {
  const username = req.params;


  fetchUser(username)
    .then(([user]) => {
      if (user === undefined) {
        next({ code: '23503' });
      } else {
        res.status(200).send({ user });
      }
    })
    .catch(next);
};
