const knex = require('knex')(require('../knexfile'));
require('dotenv').config();
const jwt = require("jsonwebtoken");


// GET NOTES ON SPECIFIC DATE
// /notes/:userId/:date
const getNotesByDate = async (req, res) => {
    try {
        const { date } = req.params;
        const userNotes = await knex('notes')
            .where({
                user_id: req.id,
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
// /notes/:userId
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
// /notes/:userId
const createNote = async (req, res) => {
    const { date, note_content } = req.body;
    try {
        const [newNoteId] = await knex('notes').insert({
            date,
            note_content,
            user_id: req.id,
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

