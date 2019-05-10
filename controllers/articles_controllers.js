const {
  fetchAllArticles,
  addComment,
  fetchCommentsbyArticleId,
  removeArticle,
  fetchArticleById,
  addArticle,
  updateArticle
} = require("../models/articles_models");

exports.getAllArticles = (req, res, next) => {
  const { sort_by, order = "desc" } = req.query;
  let conditions = {};

  Object.keys(req.query).forEach(key => {
    if (key === "author") {
      conditions = { "articles.author": req.query[key] };
    } else if (key === "topic") {
      conditions = { "articles.topic": req.query[key] };
    } else if (key === "created") {
      conditions = { "articles.created_at": req.query[key] };
    }
  });

  if (order !== "asc" && order !== "desc") {
    next({ code: "13" });
  } else {
    fetchAllArticles(conditions, sort_by, order)
      .then(articles => {
        if (articles.length === []) {
          next({ code: "5" });
        } else {
          res.status(200).send({ articles });
        }
      })
      .catch(next);
  }
};

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  if (isNaN(Number(article_id))) {
    next({ code: "22P02" });
  } else {
    fetchArticleById(article_id)
      .then(([article]) => {
        if (article === undefined) {
          next({ code: "23503" });
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
    author: articleToPost.username
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
    next({ code: "22P02" });
  } else if (Object.keys(req.body).length !== 1) {
    res.status(400);
  } else if (isNaN(Number(inc_votes))) {
    next({ code: "22P02" });
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
    next({ code: "22P02" });
  } else {
    removeArticle(article_id)
      .then(delart => {
        if (delart === 0) {
          next({ code: "23503" });
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

  if (isNaN(Number(article_id))) {
    next({ code: "22P02" });
  } else {
    fetchCommentsbyArticleId(article_id, sort_by, order)
      .then(comments => {
        res.status(200).send({ comments });
      })
      .catch(next);
  }
};

exports.postCommentOnArticle = (req, res, next) => {
  const commentToPost = req.body;
  const { article_id } = req.params;

  const formattedPost = {
    author: commentToPost.username,
    body: commentToPost.body,
    article_id
  };
  addComment(formattedPost)
    .then(([comment]) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};
