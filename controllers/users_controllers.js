const { fetchAllUsers } = require('../models/users_models');

console.log('im in the users controller');

exports.getAllUsers = (req, res, next) => {
  fetchAllUsers()
    .then((users) => {
      res.status(200).send({ users });
    });
};
