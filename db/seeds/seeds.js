const { articleData, topicData, userData, commentData } = require("../data");
const {
  createTimeStamp,
  createRef,
  createArticleIdLink
} = require("../../utils/utils.js");

exports.seed = function(knex, Promise) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() =>
      knex
        .insert(userData)
        .into("users")
        .returning("*")
    )
    .then(() =>
      knex
        .insert(topicData)
        .into("topics")
        .returning("*")
    )
    .then(() => {
      const formattedArticleData = createTimeStamp(articleData);
      return knex
        .insert(formattedArticleData)
        .into("articles")
        .returning("*");
    })
    .then(formattedArticleData => {
      const title = "title";
      const article_id = "article_id";
      const refObject = createRef(formattedArticleData, title, article_id);
      return refObject;
    })
    .then(refObject => {
      const formattedComments = createArticleIdLink(commentData, refObject);
      return knex
        .insert(formattedComments)
        .into("comments")
        .returning("*");
    });
};
