exports.up = function(knex, Promise) {
  return knex.schema.hasTable('users').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('users', (table) => {
        table.increments()
        table.string('first_name').notNullable()
        table.string('last_name').notNullable()
        table.string('username').notNullable().unique()
        table.string('email').notNullable().unique()
        table.string('password_digest').notNullable()
        table.timestamps()
      })

    }
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users')
}
