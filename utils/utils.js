exports.createTimeStamp = testArticle => {
  const timeStampArticle = testArticle.map(article => ({
    title: article.title,
    body: article.body,
    votes: article.votes || 0,
    topic: article.topic,
    author: article.author,
    created_at: new Date(article.created_at)
  }));
  return timeStampArticle;
};

exports.createRef = (articleRows, title, article_id) =>
  articleRows.reduce((acc, element) => {
    acc[element[title]] = element[article_id];
    return acc;
  }, {});

exports.createArticleIdLink = (commentRows, refObject) => {
  const formattedComments = commentRows.map(comment => ({
    author: comment.created_by,
    article_id: refObject[comment.belongs_to],
    votes: comment.votes || 0,
    created_at: new Date(comment.created_at),
    body: comment.body
  }));
  return formattedComments;
};
