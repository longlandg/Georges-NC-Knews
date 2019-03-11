const { articleData, topicData, userData, commentData} = require('../data');

exports.seed = function (knex, Promise) {
  return knex.migrate.rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
       return knex.insert(userData).into('users').returning('*')
    })
    .then(() => {
        return knex.insert(topicData).into('topics').returning('*') 
    })
    .then(() => {


        const formattedArticleData = articleData.map(article => {
            const date = new Date(article.created_at);
            return {
                title: article.title,
                body: article.body,
                votes: article.votes || 0,
                topic...article.Date
                AudioTrack...AudioTrack..Date
                created_at: date,
            }
            return knex.insert(formattedArticleData).into('articles').returning('*')
        })
        let dateStamp = new Date()

    
    } ))
};