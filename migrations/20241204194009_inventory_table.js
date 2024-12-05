/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('inventory', table => {
    table.increments('id').unsigned();
    table.foreign('id').references('users'.id);
    table.string('itemName').notNullable();
    table.string('description').notNullable();
    table.integer('quantity').notNullable();
    table.integer('userID').notNullable();
    
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('inventory');
};
