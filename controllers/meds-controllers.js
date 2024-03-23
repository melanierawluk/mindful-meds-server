const knex = require('knex')(require('../knexfile'));



// POST NEW MED
const addMedication = async (req, res) => {
    const { active, name, dose, frequency, times, user_id } = req.body;

    try {
        const timesArr = Array.isArray(times) ? times : [times];

        const data = await knex('medications').insert({
            active,
            name,
            dose,
            frequency,
            times: JSON.stringify(timesArr),
            user_id
        });

        const newMedId = data[0];
        const createdMedication = await knex('medications').where({
            id: newMedId,
        });

        res.status(201).json(createdMedication);

    } catch (error) {
        res.status(500).json({
            message: `Unable to create new medication: ${error}`
        });
    };
};



// POST NEW MEDICATION ENTRY AS AN UPDATE
const updateMedication = async (req, res) => {
    const { name, dose, frequency, times, user_id } = req.body;
    const { id } = req.params;

    try {
        const timesArr = Array.isArray(times) ? times : [times];

        // Update the active and end_date fields of the medication entry being updated
        await knex("medications")
            .where({ id })
            .update({
                active: false,
                end_date: knex.fn.now(),
            });

        // Add new entry, acting as an update to 'current' medication
        const result = await knex('medications')
            .insert({
                active: true,
                name,
                dose,
                frequency,
                times: JSON.stringify(timesArr),
                user_id
            });


        const updatedMedId = result[0];
        const updatedMedication = await knex('medications')
            .where({ id: updatedMedId, });
        res.status(200).json(updatedMedication);

    } catch (error) {
        res.status(500).json({
            message: `Unable to update medication with ID ${req.params.id}: ${error}`
        });
    };
}


module.exports = {
    addMedication,
    updateMedication,
}