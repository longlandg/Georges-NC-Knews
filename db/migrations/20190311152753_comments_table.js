
exports.up = function (knex, Promise) {
  return knex.schema.createTable('comments', (commentsTable) => {
    commentsTable.increments('comments_id').primary();
    commentsTable.string('author').references('username').inTable('users');
    commentsTable.integer('article_id').references('article_id').inTable('articles').onDelete('cascade');
    commentsTable.integer('votes' || 0);
    commentsTable.timestamp('created_at');
    commentsTable.string('body', 2000).notNullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('comments');
};
