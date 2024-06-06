const express = require('express')
const dotenv = require('dotenv')
dotenv.config();

const connectDB = require('./db/db.js');
const userRoutes = require('./routes/userRoutes.js')
const errorHandler = require('./middlewares/errorHandler.js')


connectDB();

const port = process.env.PORT;
const app= express();

app.use(express.json())

app.use('/api/v1/users' , userRoutes);
app.use(errorHandler.errorHandler);



app.listen(port, () => console.log(`Server running in port ${port}`))

