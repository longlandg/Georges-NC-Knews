const { updateComment, removeComment } = require('../models/comments_models');

console.log('im in the comments controller');

exports.patchComments = (req, res, next) => {
  const { comments_id } = req.params;
  const { inc_votes } = req.body;
  updateComment(comments_id, inc_votes)
    .then(([comment]) => {
      res.status(202).send({ comment });
    });
};


exports.deleteCommentById = (req, res, next) => {
  const { comments_id } = req.params;
  removeComment(comments_id)
    .then(() => {
      res.status(204).send({});
    });
};
