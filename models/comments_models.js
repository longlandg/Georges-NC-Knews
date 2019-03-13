const connection = require('../db/connection');

console.log('im in the comments model');

exports.updateComment = (comments_id, inc_votes) => connection
  .select('*')
  .from('comments')
  .where({ 'comments.comments_id': comments_id })
  .increment('votes', inc_votes)
  .returning('*');


