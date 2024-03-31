const knex = require('knex')(require('../knexfile'));
const jwt = require("jsonwebtoken");
require('dotenv').config();


// GET data for logged in user 
// /user/auth
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