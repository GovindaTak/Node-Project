const express = require('express')
const dotenv = require('dotenv')
dotenv.config();

const connectDB = require('./db/db.js');
const userRoutes = require('./routes/userRoutes.js')
const homeRoutes= require('../backend/routes/homeRoutes.js')
const adminRoutes= require('../backend/routes/adminRoutes.js')
const errorHandler = require('./middlewares/errorHandler.js')


connectDB();

const port = process.env.PORT;
const app= express();

app.use(express.json())

app.use('/api/v1/users' , userRoutes);
app.use('/api/v1/admin' , adminRoutes);
app.use('/api/v1/' , homeRoutes);
app.use(errorHandler.errorHandler);



app.listen(port, () => console.log(`Server running in port ${port}`))

