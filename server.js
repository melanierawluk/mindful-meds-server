const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const { PORT, CORS_ORIGIN } = process.env;
const allowedOrigins = CORS_ORIGIN.split(',');
const port = PORT || 5051;

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

const userRoutes = require("./routes/user-routes");
const medsRoutes = require("./routes/meds-routes");
const notesRoutes = require("./routes/notes-routes")
const authRoutes = require("./routes/auth-routes");

app.use('/user', userRoutes);
app.use('/meds', medsRoutes);
app.use('/notes', notesRoutes)
app.use("/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)
});