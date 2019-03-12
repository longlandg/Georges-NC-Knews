const { fetchAllArticles } = require('../models/articles_models');

console.log('im in the articles controller');

exports.getAllArticles = (req, res, next) => {
  const { sort_by, order } = req.query;
  let authorCondition = {};
  let topicCondition = {};
  const createdCondition = {};

  Object.keys(req.query).forEach((key) => {
    if (key === 'author') {
      authorCondition = { 'articles.author': req.query[key] };
    } else if (key === 'topic') {
      topicCondition = { 'articles.topic': req.query[key] };
    } else if (key === 'created') {
      topicCondition = { 'articles.created_at': req.query[key] };
    }
  });


  fetchAllArticles(authorCondition, sort_by, order, topicCondition, createdCondition)
    .then((articles) => {
      res.status(200).send({ articles });
    });
};
