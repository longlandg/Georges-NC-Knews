const { updateComment, removeComment } = require('../models/comments_models');

console.log('im in the comments controller');

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
    (next(res.status(400).send({ msg: 'BAD REQUEST article_id type is invalid' })));
  } else {
    removeComment(comments_id)
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
