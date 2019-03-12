const connection = require('../db/connection');

console.log('im in the articles model');

exports.fetchAllArticles = (authorCondition => connection
  .select('articles.article_id', 'articles.title', 'articles.body', 'articles.votes', 'articles.topic', 'articles.author', 'articles.created_at')
  .from('articles')
  .where(authorCondition)
  .leftJoin('comments', 'articles.article_id', '=', 'comments.article_id')
  .groupBy('articles.article_id')
  .count('comments.comments_id as comment_count')
  .orderBy('articles.article_id')
);
