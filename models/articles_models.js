const connection = require("../db/connection");

exports.fetchAllArticles = (conditions, sort_by, order) =>
  connection
    .select(
      "articles.article_id",
      "articles.title",
      "articles.body",
      "articles.votes",
      "articles.topic",
      "articles.author",
      "articles.created_at"
    )
    .from("articles")
    .where(conditions)
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .groupBy("articles.article_id")
    .count("comments.comments_id as comment_count")
    .orderBy(sort_by || "articles.created_at", order || "desc");

exports.fetchArticleById = article_id =>
  connection
    .select(
      "articles.article_id",
      "articles.title",
      "articles.body",
      "articles.votes",
      "articles.topic",
      "articles.author",
      "articles.created_at"
    )
    .from("articles")
    .where({ "articles.article_id": article_id })
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .groupBy("articles.article_id")
    .count("comments.comments_id as comment_count");

exports.addArticle = newArticle =>
  connection
    .insert(newArticle)
    .into("articles")
    .returning("*");

exports.updateArticle = (article_id, inc_votes) =>
  connection
    .select("*")
    .from("articles")
    .where({ "articles.article_id": article_id })
    .increment("votes", inc_votes)
    .returning("*");

exports.removeArticle = article_id =>
  connection
    .select("*")
    .from("articles")
    .where({ "articles.article_id": article_id })
    .del();

exports.fetchCommentsbyArticleId = (article_id, sort_by, order) =>
  connection
    .select("comments_id", "votes", "created_at", "author", "body")
    .from("comments")
    .where({ "comments.article_id": article_id })
    .orderBy(sort_by || "comments.created_at", order || "desc");

exports.addComment = newComment =>
  connection
    .insert(newComment)
    .into("comments")
    .returning("*");
