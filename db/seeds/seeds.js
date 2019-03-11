const {
  articleData, topicData, userData, commentData,
} = require('../data');
const { createTimeStamp, createRef, createArticleIdLink } = require('../../utils/utils.js');

exports.seed = function (knex, Promise) {
  return knex.migrate.rollback()
    .then(() => knex.migrate.latest())
    .then(() => knex.insert(userData).into('users').returning('*'))
    .then(() => knex.insert(topicData).into('topics').returning('*'))
    .then(() => {
      const formattedArticleData = createTimeStamp(articleData);
      return knex.insert(formattedArticleData).into('articles').returning('*');
    })
    .then((article) => {
      // const title = article.title;
      // const article_id = 'article_id';
      const refObject = createRef(articleData, title, article_id);
      return refObject;
    })
    .then((refObject) => {
      const formattedComments = createArticleIdLink(commentData, refObject);
      return knex.insert(formattedComments).into('comments').returning('*');
    });
};


// exports.createRef = (articleRows, title, article_id) => articleRows.reduce((acc, element) => {
//   acc[element[title]] = element[article_id];
//   return acc;
// }, {});

// exports.createArticleIdLink = (commentRows, refObject) => {
//   const formattedComments = commentRows.map(comment => ({
//     author: comment.created_by,
//     article_id: refObject[comment.belongs_to],
//     votes: comment.votes || 0,
//     created_at: new Date(comment.created_at),
//     body: comment.body,
//   }));
//   return formattedComments;
// };
