/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('inventory').del()
  await knex('inventory').insert([
    {itemName: 'computers', description: 'sample description', quantity: 1244, userID: 1},
    {itemName: 'cars', description: 'sample description', quantity: 221, userID: 2},
    {itemName: 'couches', description: 'sample description', quantity: 431, userID: 3},
    {itemName: 'homes', description: 'adding a huge description so thtis i smore than 100 lines lol this is craz to do beacuse idke nohwmandy lines 1200 cahrarates is ', quantity: 15, userID: 2}
  ]);
};
