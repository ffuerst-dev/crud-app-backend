/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('inventory').del()
  await knex('inventory').insert([
    {itemName: 'computers', description: 'sample description', quantity: 1244},
    {itemName: 'cars', description: 'sample description', quantity: 221},
    {itemName: 'couches', description: 'sample description', quantity: 431}
  ]);
};
