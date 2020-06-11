
exports.up = function(knex) {
  return knex.schema.createTable('incidents', function (table) {
    table.increments(); // cria uma chave primária numérica (tipo um id)

    table.string('title').notNullable();
    table.string('description').notNullable();
    table.decimal('value').notNullable();
    
    table.string('ong_id').notNullable(); // relacionamento entre as tabelas

    table.foreign('ong_id').references('id').inTable('ongs') // chave extrangeira relacional
  });    
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents')
};
