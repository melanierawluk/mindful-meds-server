const knex = require('knex')(require('../knexfile'));
const router = require("express").Router();
const jwt = require("jsonwebtoken");

// GET USER PROFILE
// const getUserProfile = async (req, res) => {
//     try {
//         const { userId } = req.params
//         const userProfile = await knex('users').where({ id: userId })
//         if (!userId || userProfile.length === 0) {
//             return res.status(404).json({
//                 message: `User with ID ${id} not found`
//             });
//         }
//         const userData = userProfile[0];
//         res.json(userData);
//     } catch (error) {
//         res.status(500).json({
//             message: `Unable to retrieve user with ID ${userId}: ${error}`
//         })
//     }
// }


// GET data for logged in user (/user/auth)
const getUserProfile = async (req, res) => {
    if (!req.headers.authorization) {
        return res.status(401).send("Please login");
    }
    const authHeader = req.headers.authorization;
    const authToken = authHeader.split(" ")[1];

    try {
        const decodedToken = jwt.verify(authToken, process.env.JWT_KEY);
        const user = await knex("users").where({ id: decodedToken.id }).first();
        delete user.password;
        res.send(user);
    } catch (error) {
        res.status(401).send("Invalid auth token");
    }
};


module.exports = {
    getUserProfile,
}