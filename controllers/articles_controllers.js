const { fetchAllArticles } = require('../models/articles_models');

console.log('im in the articles controller');

exports.getAllArticles = (req, res, next) => {
  let authorCondition = {};

  Object.keys(req.query).forEach((key) => {
    if (key === 'author') {
      authorCondition = { 'articles.author': req.query[key] };
    }
  });


  fetchAllArticles(authorCondition)
    .then((articles) => {
      console.log(articles);
      res.status(200).send({ articles });
    });
};
