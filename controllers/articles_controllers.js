const { fetchAllArticles, fetchArticleById, addArticle } = require('../models/articles_models');

console.log('im in the articles controller');

exports.getAllArticles = (req, res, next) => {
  const { sort_by, order } = req.query;
  let authorCondition = {};
  let topicCondition = {};
  let createdCondition = {};

  Object.keys(req.query).forEach((key) => {
    if (key === 'author') {
      authorCondition = { 'articles.author': req.query[key] };
    } else if (key === 'topic') {
      topicCondition = { 'articles.topic': req.query[key] };
    } else if (key === 'created') {
      createdCondition = { 'articles.created_at': req.query[key] };
    }
  });


  fetchAllArticles(authorCondition, sort_by, order, topicCondition, createdCondition)
    .then((articles) => {
      res.status(200).send({ articles });
    });
};

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;

  fetchArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    });
};


exports.postArticle = (req, res, next) => {
  const articleToPost = req.body;
  const foramttedArticle = {
    title: articleToPost.title,
    body: articleToPost.body,
    topic: articleToPost.topic,
    author: articleToPost.username,
  };
  addArticle(foramttedArticle)
    .then(([article]) => {
      res.status(201).send({ article });
    });
};
