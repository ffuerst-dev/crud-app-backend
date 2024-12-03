/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: 1, userName: 'supermichael', password: 'password'},
    {id: 2, userName: 'notlikeus', password: '1234'},
    {id: 3, userName: 'randomlady', password: '4321'}
  ]);
};
