const knex = require('knex')(require('../knexfile'));


// GET NOTES ON SPECIFIC DATE
const getNotesByDate = async (req, res) => {
    try {
        const { userId, date } = req.params;
        const userNotes = await knex('notes')
            .where({
                user_id: userId,
                date: date
            })
        if (userNotes.length === 0) {
            return res.status(200).json([]);
        }
        const userNote = userNotes[0];
        res.status(200).json(userNote)
    } catch (error) {
        res.status(500).json({
            message: `Unable to retrieve notes for this date`
        })
    }
}



// EDIT NOTE
const editNote = async (req, res) => {
    const { note_content, id } = req.body;
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



// CREATE NEW NOTE 
const createNote = async (req, res) => {
    const { userId } = req.params;
    const { date, note_content } = req.body;
    try {
        const [newNoteId] = await knex('notes').insert({
            date,
            note_content,
            user_id: userId,
        });

        const newNote = await knex('notes').where('id', newNoteId).first();
        res.status(201).json(newNote);

    } catch (error) {
        res.status(500).json({
            message: `Unable to create new note: ${error}`
        });
    };
};



module.exports = {
    getNotesByDate,
    editNote,
    createNote
}

