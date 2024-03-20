const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const { PORT, CORS_ORIGIN } = process.env;
const allowedOrigins = CORS_ORIGIN.split(',');
const port = PORT || 5051;

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

app.use('/user', userRoutes);
app.use('/meds', medsRoutes);

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)
});