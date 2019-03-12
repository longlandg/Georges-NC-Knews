const connection = require('../db/connection');

console.log('im in the articles model');

exports.fetchAllArticles = (authorCondition, sort_by, order, topicCondition, createdCondition) => connection
  .select('articles.article_id', 'articles.title', 'articles.body', 'articles.votes', 'articles.topic', 'articles.author', 'articles.created_at')
  .from('articles')
  .where(authorCondition)
  .where(topicCondition)
  .where(createdCondition)
  .leftJoin('comments', 'articles.article_id', '=', 'comments.article_id')
  .groupBy('articles.article_id')
  .count('comments.comments_id as comment_count')
  .orderBy(sort_by || 'articles.created_at', order || 'desc');
//   .orderBy('articles.article_id', order || 'asc');
//   .orderBy('articles.article_id', 'asc');


//   .orderBy('articles.article_id');
