exports.up = function(knex, Promise) {
    return knex.schema.createTable('lancamentos', table => {
      table.increments('id').primary()
      table.date('dataEntrada').notNull()
      table.integer('tipoId').unsigned().index().references('id')
            .inTable('tipos')
      table.integer('descricaoId').unsigned().index().references('id')
            .inTable('descricao')
      table.integer('empresaId').unsigned().index().references('id')
            .inTable('empresas')
      table.decimal('numParcela',).notNull().defaultTo(0)
      table.integer('lancamentoId').unsigned().index().references('id')
            .inTable('lancamentos')
      table.decimal('valor').notNull()
      table.integer('userId').unsigned().index().references('id')
            .inTable('users')
      table.date('dataLancamento').notNull()
      

    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('lancamentos')
};