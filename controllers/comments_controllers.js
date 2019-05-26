const { updateComment, removeComment } = require('../models/comments_models');

exports.patchComments = (req, res, next) => {
  const { comments_id } = req.params;
  const { inc_votes } = req.body;

  updateComment(comments_id, inc_votes)
    .then(([comment]) => {
      res.status(200).send({ comment });
    })
    .catch(next);
};

exports.deleteCommentsById = (req, res, next) => {
  const { comments_id } = req.params;
  if (isNaN(Number(comments_id))) {
    next({ code: '22P02' });
  } else {
    removeComment(comments_id)
      .then((delart) => {
        if (delart === 0) {
          next({ code: '42703' });
        } else {
          res.status(204).send({});
        }
      })
      .catch(next);
  }
};
