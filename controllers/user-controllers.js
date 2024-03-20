const knex = require('knex')(require('../knexfile'));


// GET USER PROFILE
const getUserProfile = async (req, res) => {
    try {
        const { userId } = req.params
        const userProfile = await knex('users').where({ id: userId })
        if (!userId || userProfile.length === 0) {
            return res.status(404).json({
                message: `User with ID ${id} not found`
            });
        }
        const userData = userProfile[0];
        res.json(userData);
    } catch (error) {
        res.status(500).json({
            message: `Unable to retrieve user with ID ${userId}: ${error}`
        })
    }
}



// GET LIST OF MEDICATIONS FOR USER
const getUserMedicationList = async (req, res) => {
    try {
        const { userId } = req.params;
        const medicationList = await knex('medications').where({ user_id: userId })
        const medicationArr = [];
        if (!userId || medicationList.length === 0) {
            return res.status(404).json({
                message: `Medication list for user with ID ${userId} not found`
            });
        }
        medicationList.map((medication) => {
            const medicationObj = {
                id: medication.id,
                active: medication.active,
                name: medication.name,
                dose: medication.dose,
                frequency: medication.frequency,
                times: medication.times,
                start_date: medication.start_date,
                end_date: medication.end_date
            }
            return (medicationArr.push(medicationObj));
        });
        res.status(200).json(medicationArr);
    } catch (error) {
        res.status(500).json({
            message: `Unable to retrieve medication list for user with ID ${userId}`
        })
    }
}



// GET SPECIFIC MEDICATION FOR USER
const getUserMedication = async (req, res) => {
    try {
        const { userId, medId } = req.params;
        const userMedication = await knex('medications')
            .where({
                id: medId,
                user_id: userId
            })
        if (!userId || userMedication.length === 0) {
            return res.status(404).json({
                message: `Medication with ID ${medId} cannot be found for user with ID ${userId}`
            });
        }
        const userMed = userMedication[0];
        res.json(userMed);
    } catch (error) {
        res.status(500).json({
            message: `Unable to retrieve medication with ID ${medId} with ID ${userId}: ${error}`
        })
    }
}

// - GET /user/:id/notes/:date - Retrieve notes for a specified date. Includes information about medication that were active on the specified date

const getNotes = async (req, res) => {
    try {
        const { userId, date } = req.params;

        if (NaN(date.getTime())) {
            return res.status(400).json({
                message: `Invalid date parameter`
            })
        }
        const userNotes = await knex('notes as n')
            .select('notes.note_content', 'notes.date', 'medications.name', 'medications.dose', 'medications.frequency', 'medications.times')
            .from('notes')
            .join('medications', 'medications.user_id', '=', 'notes.user_id')
            .where('notes.user_id', userId)
            .andWhereRaw('notes.date >= medications.start_date AND (notes.date <= medications.end_date OR medications.end_date IS NULL')
            .andWhere('notes.date', date)

        res.json(userNotes);

    } catch (error) {
        res.status(500).json({
            message: `Unable to retrieve notes for this date`
        })

    }
    // notes table

    // date = date
    // join   // where id = user_id
    // medication table

    // select content, name
    // from notes,
    // join medications
    // where date is within start and end date || if end date null, date falls after start date
}


module.exports = {
    getUserProfile,
    getUserMedicationList,
    getUserMedication,
    getNotes,
}