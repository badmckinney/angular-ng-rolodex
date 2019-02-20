
exports.up = function (knex, Promise) {
  return knex.schema.createTable('contacts', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.timestamps(true, true);
    table.string('address').nullable();
    table.string('mobile').nullable();
    table.string('work').nullable();
    table.string('home').nullable();
    table.string('email').nullable();
    table.string('twitter').nullable();
    table.string('instagram').nullable();
    table.string('github').nullable();
    table.integer('created_by').references('id').inTable('users');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('contacts');
};
