const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const morgan = require('morgan');
dotenv.config();

const connectDB = require('./db/db.js');
const userRoutes = require('./routes/userRoutes.js')
const homeRoutes= require('../backend/routes/homeRoutes.js')
const adminRoutes= require('../backend/routes/adminRoutes.js')
const chatRoutes = require('./routes/chatRoutes.js')
const errorHandler = require('./middlewares/errorHandler.js')



connectDB();

const port = process.env.PORT;
const app= express();

app.use(morgan('combined'));

app.use(express.json())
app.use(cors());



app.use('/api/v1/users' , userRoutes);
app.use('/api/v1/admin' , adminRoutes);
app.use('/api/v1/' , homeRoutes);
app.use('/api/v1/integration' , chatRoutes);
app.use(errorHandler.errorHandler);




app.listen(port , '55.55.54.226',() => console.log(`Server running in port ${port}`))

