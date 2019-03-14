const connection = require('../db/connection');

console.log('im in the users model');

exports.fetchAllUsers = () => connection.select('*').from('users').returning('*');


exports.addUser = newUser => connection.insert(newUser).into('users').returning('*');


exports.fetchUser = username => connection
  .select('*')
  .from('users')
  .where(username)
  .returning('*');
