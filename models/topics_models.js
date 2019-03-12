const connection = require('../db/connection');

console.log('im in the fetchAllTopics model');

exports.fetchAllTopics = () => connection.select('*').from('topics').returning('*');
