const jwt = require('jsonwebtoken');
const knex = require('knex')(require('../knexfile'));
require('dotenv').config();

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const authToken = authHeader.split(" ")[1];

    try {
        const decodedToken = jwt.verify(authToken, process.env.JWT_KEY);
        req.id = decodedToken.id;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = verifyToken;