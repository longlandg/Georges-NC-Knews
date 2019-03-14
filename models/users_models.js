const connection = require('../db/connection');

console.log('im in the users model');

exports.fetchAllUsers = () => connection.select('*').from('users').returning('*');
