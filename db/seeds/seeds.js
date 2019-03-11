const { articleData, topicData, userData, commentData} = require('../data');
const { createTimeStamp } = require('../../utils/utils.js');

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
        const formattedArticleData = createTimeStamp(articleData)
            return knex.insert(formattedArticleData).into('articles').returning('*')
        })
       

    
    } 
