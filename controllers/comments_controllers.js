const { updateComment, removeComment } = require('../models/comments_models');

exports.patchComments = (req, res, next) => {
  const { comments_id } = req.params;
  const { inc_votes } = req.body;

  updateComment(comments_id, inc_votes)
    .then(([comment]) => {
      res.status(202).send({ comment });
    })
    .catch(next);
};


exports.deleteCommentsById = (req, res, next) => {
  const { comments_id } = req.params;
  if (isNaN(Number(comments_id))) {
    res.status(400);
  } else {
    removeComment(comments_id)
      .then((delart) => {
        if (delart === 0) {
          res.status(400);
        } else {
          res.status(204).send({});
        }
      })
      .catch(next);
  }
};
