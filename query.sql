\c nc_knews_test


SELECT * FROM articles
JOIN ("comments" ON "articles.article_id","comments.article_id");

