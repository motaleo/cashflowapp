
exports.up = function(knex, Promise) {
  return knex.schema.createTable('descricao', table => {
      table.increments('id').primary()
      table.string('textoDescricao').notNull()
      table.integer('empresaId').unsigned().index().references('id')
            .inTable('empresas')
      table.integer('tipoId').unsigned().index().references('id')
            .inTable('tipos')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('descricao')
};
