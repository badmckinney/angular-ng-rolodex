
exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('username').notNullable().unique();
    table.string('password').notNullable();
    table.timestamps(true, true);
    table.string('name').nullable();
    table.string('email').nullable();
    table.string('address').nullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('users');
};
