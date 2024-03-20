/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('medications', table => {
        table.increments('id').primary();
        table.boolean('active').notNullable();
        table.string('name').notNullable();
        table.string('dose').notNullable();
        table.string('frequency').notNullable();
        table.json('times').notNullable();
        table.timestamp('start_date').defaultTo(knex.fn.now());
        table.timestamp('end_date').defaultTo(null);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id').references('id').inTable('users');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('medications')

};
