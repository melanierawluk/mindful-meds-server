/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('notes').del()
  await knex('notes').insert([
    {
      id: 1,
      date: '2023-11-11',
      note_content: 'Feeling optimistic about the future.',
      user_id: 1
    },
    {
      id: 2,
      date: '2023-11-15',
      note_content: 'Experienced mild nausea and headache this morning.',
      user_id: 1
    },
    {
      id: 3,
      date: '2023-12-01',
      note_content: 'Feeling more energetic and focused.',
      user_id: 1
    },
  ]);
};
