
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

// Mongo Data Models
exports.User = require('./models/user');

exports.connectDB = async () => {
    try{
        let conn = null;
        if(process.env.NODE_ENV === 'dev'){ // Connect to DEV DB
            conn = await mongoose.connect(process.env.MONGO_CONNECT_DEV, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
        } else{ // Connect to PROD DB
            conn = await mongoose.connect(process.env.MONGO_CONNECT_PROD, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
        }
        //Check connection
        console.log(`MongoDB Connected ${conn.connection.host}`);
    } catch(err){
        console.error(err);
        process.exit(1);
    }
}