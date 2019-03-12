const connection = require('../db/connection');

console.log('im in the fetchAllTopics model');

exports.fetchAllTopics = () => connection.select('*').from('topics').returning('*');


exports.addTopic = newTopic => connection.insert(newTopic).into('topics').returning('*');
