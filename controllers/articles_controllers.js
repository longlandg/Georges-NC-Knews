const {
  fetchAllArticles, addComment, fetchCommentsbyArticleId, removeArticle, fetchArticleById, addArticle, updateArticle,
} = require('../models/articles_models');

let georgeErrors = {};
console.log('im in the articles controller');
// expect(res.body.articles[0]).contain.keys('author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count');


exports.getAllArticles = (req, res, next) => {
  const { sort_by, order = 'desc' } = req.query;
  let conditions = {};

  // console.log(sort_by)
  // console.log(order)
  Object.keys(req.query).forEach((key) => {
    // console.log(res.body)
    if (key === 'author') {
      conditions = { 'articles.author': req.query[key] };
    } else if (key === 'topic') {
      conditions = { 'articles.topic': req.query[key] };
    } else if (key === 'created') {
      conditions = { 'articles.created_at': req.query[key] };
    }
  });
  if (order !== 'asc' && order !== 'desc') {
    georgeErrors = { code: 13 };
    next(georgeErrors);
  } else {
    fetchAllArticles(conditions, sort_by, order)
      .then((articles) => {
        res.status(200).send({ articles });
      })
      .catch(next);
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
      .catch(next);
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
    .catch(next);
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
      .catch(next);
  }
};


exports.deleteArticleById = (req, res, next) => {
  const { article_id } = req.params;
  if (isNaN(Number(article_id))) {
    next
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
      .catch(next);
  }
};

exports.getAllCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { sort_by, order } = req.query;
  const int = Number(article_id);
  if (isNaN(int)) {
    (next(res.status(400).send({ msg: 'BAD REQUEST article_id type is invalid' })));
  } else {
    fetchCommentsbyArticleId(article_id, sort_by, order)
      .then((comments) => {
        res.status(200).send({ comments });
      })
      .catch(next);
  }
};


exports.postCommentOnArticle = (req, res, next) => {
  const commentToPost = req.body;
  const { article_id } = req.params;
  const int = Number(article_id);

  const formattedPost = {
    author: commentToPost.username,
    body: commentToPost.body,
    article_id,
  };
  // error handling needed here
  addComment(formattedPost)
    .then(([comment]) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};
