const express = require('express')
const app = express();
const dotenv = require('dotenv')
const morgan = require('morgan')
const connectDB = require('./config/db')
const bp = require('body-parser')
const path = require('path')
const Colors = require('colors')
const cors = require('cors')
// const authJwt = require('./helpers/jwt');

// Load env vars
dotenv.config({path: './config/config.env'})

// Connect to db
connectDB();

// Middleware
app.use(morgan('dev'));
app.use(bp.json())
app.use(cors())
app.use(bp.urlencoded({ extended: true }))
// app.use(authJwt); 



app.use(express.static(path.join(__dirname, 'assets')));

// Route files
const moviesRoute = require('./routes/movies')
const usersRoute = require('./routes/users');
const adminRoute = require('./routes/admin')


// Mount routers
app.use('/rend/api/movies', moviesRoute);
app.use('/rend/api/users', usersRoute);
app.use('/rend/api/admins', adminRoute)



// Listening to port
const PORT = process.env.PORT||5000;


const server =  app.listen(PORT, ()=>{
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
});

