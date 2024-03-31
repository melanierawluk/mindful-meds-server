/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    { id: 1, name: 'Leeland Eyelet', email: 'leeland@goldendoodle.com', password: '$2a$10$h/PovQRdQBIGoH3iQOk1wubAL/wyNRcJ4HbQHYzPVKTWIN4SPvzQS' },
  ]);
};
