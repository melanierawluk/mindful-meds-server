/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('medications').del()
  await knex('medications').insert([
    { id: 1, active: false, name: 'Prozac', dose: '20', frequency: 'Twice Daily', times: JSON.stringify(['9:00 AM', '6:00 PM']), start_date: '2024-03-01', end_date: '2024-03-18', user_id: 1 },
    { id: 2, active: false, name: 'Zoloft', dose: '50', frequency: 'Once Daily', times: JSON.stringify(['8:00 AM']), start_date: '2024-03-01', end_date: '2024-03-18', user_id: 1 },
    { id: 3, active: false, name: 'Lexapro', dose: '10', frequency: 'Once Daily', times: JSON.stringify(['10:00 AM']), start_date: '2024-03-01', end_date: '2024-03-18', user_id: 1 },
    { id: 4, active: true, name: 'Wellbutrin', dose: '150', frequency: 'Once Daily', times: JSON.stringify(['9:00 AM']), start_date: '2024-03-20', user_id: 1 },
    { id: 5, active: true, name: 'Lamotrigine', dose: '200', frequency: 'Twice Daily', times: JSON.stringify(['9:00 AM', '6:00 PM']), start_date: '2024-03-20', user_id: 1 },
    { id: 6, active: true, name: 'Buspirone', dose: '25', frequency: 'Twice Daily', times: JSON.stringify(['9:00 AM', '6:00 PM']), start_date: '2024-03-20', user_id: 1 }
  ]);
};
