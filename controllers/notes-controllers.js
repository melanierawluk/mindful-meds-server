const knex = require('knex')(require('../knexfile'));


// - GET NOTES FROM USER ON SELECTED DATE, WITH MEDICATIONS TAKEN ON THAT DATE
const getNotes = async (req, res) => {
    try {
        const { userId, date } = req.params;
        const userNotes = await knex('notes')
            .join('medications', 'medications.user_id', 'notes.user_id')
            .select('notes.note_content', 'notes.date', 'medications.name', 'medications.dose', 'medications.frequency', 'medications.times')
            .where('notes.user_id', userId)
            .andWhere('notes.date', date)
            .whereRaw('notes.date >= medications.start_date AND (notes.date <= medications.end_date OR medications.end_date IS NULL)')

        res.status(200).json(userNotes);

    } catch (error) {
        res.status(500).json({
            message: `Unable to retrieve notes for this date`
        })
    }
}

// EDIT NOTE
const editNote = async (req, res) => {
    const { note_content } = req.body;
    const { noteId: id } = req.params;
    try {
        const updatedNote = await knex('notes')
            .where({ id })
            .update({ note_content });

        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(500).json({
            message: `Unable to edit note: ${error}`,
        });
    }
};

module.exports = {
    getNotes,
    editNote
}

