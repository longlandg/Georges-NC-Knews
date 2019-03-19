const connection = require('../db/connection');

exports.fetchAllTopics = () => connection.select('*').from('topics').returning('*');


exports.addTopic = newTopic => connection.insert(newTopic).into('topics').returning('*');
