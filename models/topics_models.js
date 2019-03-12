const connection = require('../db/connection');


exports.fetchAllTopics = () => {
  console.log('im in the fetchAllTopics model');
  return connection.select('*').from('topics').returning('*');
};
