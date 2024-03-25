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


module.exports = {
    getUserProfile,
}