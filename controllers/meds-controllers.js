const knex = require('knex')(require('../knexfile'));
require('dotenv').config();
const jwt = require("jsonwebtoken");



// GET LIST OF MEDICATIONS FOR USER
// /user/:userId
const getMedicationList = async (req, res) => {
    try {
        const medicationList = await knex('medications').where({ user_id: req.id });
        const medicationArr = [];
        if (!req.id || medicationList.length === 0) {
            return res.status(404).json({
                message: `Medication list for user with ID ${req.id} not found`
            });
        }

        medicationList.forEach((medication) => {
            const medicationObj = {
                id: medication.id,
                active: medication.active,
                name: medication.name,
                dose: medication.dose,
                frequency: medication.frequency,
                times: medication.times,
                start_date: medication.start_date,
                end_date: medication.end_date
            };
            medicationArr.push(medicationObj);
        });
        res.status(200).json(medicationArr);
    } catch (error) {
        res.status(500).json({
            message: `Unable to retrieve medication list for user with ID ${req.id}`
        });
    }
};



// GET SPECIFIC MEDICATION FOR USER
// /user/:userId/:medId
const getMedicationById = async (req, res) => {
    try {
        const { medId } = req.params;
        const userMedication = await knex('medications')
            .where({
                id: medId,
                user_id: req.id
            })
        if (!req.id || userMedication.length === 0) {
            return res.status(200).json({
                message: `Medication with ID ${medId} cannot be found for user with ID ${req.id}`
            });
        }
        const userMed = userMedication[0];
        res.json(userMed);
    } catch (error) {
        res.status(500).json({
            message: `Unable to retrieve medication with ID ${medId} with ID ${req.id}: ${error}`
        })
    }
}



// GET MEDS TAKEN ON SPECIFIC DATE
//user/:userId/date/:date
const getMedicationsByDate = async (req, res) => {
    try {
        const { date } = req.params;
        const userMedicationsOnDate = await knex('medications')
            .where({
                user_id: req.id,
            })
            .whereRaw('(? >= start_date) AND (? <= end_date OR end_date IS NULL)', [date, date]);
        const medicationsByDateArr = [];


        if (!req.id || userMedicationsOnDate.length === 0) {
            return res.status(200).json([]);
        }
        userMedicationsOnDate.forEach((medication) => {
            const medicationObject = {
                id: medication.id,
                name: medication.name,
                dose: medication.dose,
                frequency: medication.frequency,
                times: medication.times,
                start_date: medication.start_date,
                end_date: medication.end_date
            }
            return (medicationsByDateArr.push(medicationObject));
        });
        res.status(200).json(medicationsByDateArr);
    } catch (error) {
        res.status(500).json({
            message: `Unable to retrieve medications ${error}`
        })
    }
}



// POST NEW MED
// /user/:userId/add
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
// /user/:medId/update
const updateMedication = async (req, res) => {
    const { name, dose, frequency, times, user_id } = req.body;
    const { medId } = req.params;

    try {
        const timesArr = Array.isArray(times) ? times : [times];

        // Update the active and end_date fields of the medication entry being updated
        await knex("medications")
            .where({ id: medId })
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
            message: `Unable to update medication with ID ${medId}: ${error}`
        });
    };
}


// PATCH MEDICATION TO INACTIVATE IT
// /user/:userId/:medId
const stopMedication = async (req, res) => {
    const { medId } = req.params;

    try {
        const updateMedication = await knex("medications")
            .where({ id: medId })
            .update({
                active: false,
                end_date: knex.fn.now(),
            });

        res.status(200).json(updateMedication)

    } catch (error) {
        res.status(500).json({
            message: `Unable to stop medication with ID ${medId}: ${error}`
        });
    };
}


module.exports = {
    getMedicationById,
    getMedicationsByDate,
    getMedicationList,
    addMedication,
    updateMedication,
    stopMedication
}