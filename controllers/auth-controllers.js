require('dotenv').config();

const router = require("express").Router();
const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//POST /auth/login
const authUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(404).send("Please enter the required fields");
    }

    const user = await knex("users").where({ email: email }).first();
    if (!user) {
        return res.status(400).send("Invalid email");
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).send("Invalid password");
    }

    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_KEY,
        { expiresIn: "24h" }
    );

    res.send({ token });
};



//POST auth/register

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).send("Please enter the required fields");
    }

    const hashedPassword = bcrypt.hashSync(password);

    // Create the new user
    const newUser = {
        name,
        email,
        password: hashedPassword,
    };

    // Insert it into our database
    try {
        await knex("users").insert(newUser);
        res.status(201).send("Registered successfully");
    } catch (error) {
        console.error(error);
        res.status(400).send("Failed registration");
    }
}

module.exports = {
    authUser,
    registerUser
}