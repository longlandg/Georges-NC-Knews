const {
  articleData, topicData, userData, commentData,
} = require('../data');
const { createTimeStamp } = require('../../utils/utils.js');

exports.seed = function (knex, Promise) {
  return knex.migrate.rollback()
    .then(() => knex.migrate.latest())
    .then(() => knex.insert(userData).into('users').returning('*'))
    .then(() => knex.insert(topicData).into('topics').returning('*'))
    .then(() => {
      const formattedArticleData = createTimeStamp(articleData);
      return knex.insert(formattedArticleData).into('articles').returning('*');
    });
};
