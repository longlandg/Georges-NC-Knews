
exports.up = function (knex, Promise) {
  return knex.schema.createTable('articles', (articlesTable) => {
    articlesTable.increments('article_id').primary();
    articlesTable.string('title').notNullable();
    articlesTable.string('body', 2000).notNullable();
    articlesTable.integer('votes' || 0);
    articlesTable.string('topic').references('slug').inTable('topics');
    articlesTable.string('author').references('username').inTable('users');
    articlesTable.timestamp('created_at');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('articles');
};
