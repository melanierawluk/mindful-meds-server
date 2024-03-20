/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('medications').del()
  await knex('medications').insert([
    { id: 1, active: true, name: 'Prozac', dose: '20mg', frequency: 'Twice daily', times: JSON.stringify(['9:00 AM', '6:00 PM']), start_date: new Date(), user_id: 1 },
    { id: 2, active: true, name: 'Zoloft', dose: '50mg', frequency: 'Once daily', times: JSON.stringify(['8:00 AM']), start_date: new Date(), user_id: 1 },
    { id: 3, active: false, name: 'Lexapro', dose: '10mg', frequency: 'Once daily', times: JSON.stringify(['10:00 AM']), start_date: new Date(), user_id: 1 },
    { id: 4, active: false, name: 'Paxil', dose: '40mg', frequency: 'Once daily', times: JSON.stringify(['11:00 AM']), start_date: new Date(), user_id: 1 }
  ]);
};
