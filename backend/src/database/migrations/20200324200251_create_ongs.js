
exports.up = function(knex) { // responsável pela criação
  return knex.schema.createTable('ongs', function (table) {
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable();
    
  })
};

exports.down = function(knex) { // responsável por desfazer algo que fiz e deu errado
  return knex.schema.dropTable('ongs');
};
