module.exports = {
  client: 'mysql',
    connection: {
      host: 'localhost',
      user:     'root',
      password: '',
      database: 'cashflowapp'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
}