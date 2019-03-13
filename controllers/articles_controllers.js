const {
  fetchAllArticles, addComment, fetchCommentsbyArticleId, removeArticle, fetchArticleById, addArticle, updateArticle,
} = require('../models/articles_models');

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

exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;

  updateArticle(article_id, inc_votes)
    .then(([updatedArticle]) => {
      res.status(202).send({ updatedArticle });
    });
};

exports.deleteArticleById = (req, res, next) => {
  const { article_id } = req.params;
  removeArticle(article_id)
    .then(() => {
      res.status(204).send({});
    });
};

exports.getAllCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { sort_by, order } = req.query;

  fetchCommentsbyArticleId(article_id, sort_by, order)
    .then((comments) => {
      res.status(200).send({ comments });
    });
};


exports.postCommentOnArticle = (req, res, next) => {
  const commentToPost = req.body;
  const { article_id } = req.params;


  const formattedPost = {
    author: commentToPost.username,
    body: commentToPost.body,
    article_id,
  };
  addComment(formattedPost)
    .then(([comment]) => {
      res.status(201).send({ comment });
    });
};
