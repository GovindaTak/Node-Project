const express = require('express')
const dotenv = require('dotenv')
dotenv.config();

const connectDB = require('./db/db.js');
connectDB();

const port = process.env.PORT;
const app= express();


app.listen(port, () => console.log(`Server running in port ${port}`))

