/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {userName: 'supermichael', password: 'password'},
    {userName: 'notlikeus', password: '1234'},
    {userName: 'randomlady', password: '4321'}
  ]);
};
