const { fetchAllArticles, addArticle } = require('../models/articles_models');

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

exports.postArticle = (req, res, next) => {
  const articleToPost = req.body;
  const foramttedArticle = {
    title: articleToPost.title,
    body: articleToPost.body,
    topic: articleToPost.topic,
    author: articleToPost.username,
  };

  console.log('this is the reqbody', req.body);
  addArticle(foramttedArticle)
    .then(([article]) => {
      console.log('this is the article', article);
      res.status(201).send({ article });
    });
};
