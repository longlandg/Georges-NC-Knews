const {
  fetchAllArticles, addComment, fetchCommentsbyArticleId, removeArticle, fetchArticleById, addArticle, updateArticle,
} = require('../models/articles_models');

let georgeErrors = {};
console.log('im in the articles controller');

exports.getAllArticles = (req, res, next) => {
  const { sort_by, order = 'desc' } = req.query;
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
  if (order !== 'asc' && order !== 'desc') {
    georgeErrors = { code: 13 };
    next(georgeErrors);
  } else {
    fetchAllArticles(authorCondition, sort_by, order, topicCondition, createdCondition)
      .then((articles) => {
        res.status(200).send({ articles });
      })
      .catch((err) => {
        next(err);
      });
  }
};

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  console.log('this is the article', article_id);
  if (typeof (Number(article_id)) !== 'number') {
    next(res.status(400).send({ msg: 'BAD REQUEST invalid input' }));
  } else {
    fetchArticleById(article_id)
      .then((article) => {
        if (article.length === 0) {
          (next(res.status(404).send({ msg: 'BAD REQUEST input does not exist' })));
        } else {
          res.status(200).send({ article });
        }
      })
      .catch((err) => {
        next(err);
      });
  }
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
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  if (inc_votes === undefined) {
    (next(res.status(400).send({ msg: 'BAD REQUEST missing keys' })));
  } else if (Object.keys(req.body).length !== 1) {
    (next(res.status(400).send({ msg: 'BAD REQUEST too many keys' })));
  } else if (isNaN(Number(inc_votes))) {
    (next(res.status(400).send({ msg: 'BAD REQUEST invalid value' })));
  } else {
    updateArticle(article_id, inc_votes)
      .then(([updatedArticle]) => {
        res.status(202).send({ updatedArticle });
      })
      .catch((err) => {
        next(err);
      });
  }
};


exports.deleteArticleById = (req, res, next) => {
  const { article_id } = req.params;
  if (isNaN(Number(article_id))) {
    (next(res.status(400).send({ msg: 'BAD REQUEST article_id type is invalid' })));
  } else {
    removeArticle(article_id)
      .then((delart) => {
        if (delart === 0) {
          (next(res.status(400).send({ msg: 'BAD REQUEST article_id does not exist' })));
        } else {
          res.status(204).send({});
        }
      })
      .catch((err) => {
        next(err);
      });
  }
};

exports.getAllCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { sort_by, order } = req.query;

  fetchCommentsbyArticleId(article_id, sort_by, order)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
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
