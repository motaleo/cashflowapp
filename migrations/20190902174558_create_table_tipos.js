
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tipos', table => {
      table.increments('id').primary()
      table.string('tipo').notNull()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tipos')
};
