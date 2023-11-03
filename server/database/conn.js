// import { MongoMemoryServer } from "mongodb-memory-server";
const {MongoMemoryServer} = require('mongodb-memory-server')
const mongoose = require("mongoose")
const config = require('../config')

// const mongod  = new MongoMemoryServer();
async function connect()
{
    // const mongod  = await MongoMemoryServer.create();
    // const getUri = mongod.getUri(); 
    // console.log('Connected to database') 
    // mongoose.set('strictQuery', true) 
    // const db = await mongoose.connect(getUri);
    
    // return db;
    mongoose.connect(config.DB_URL).then(()=>{
        console.log('mongodb connnected successfully')
    }).catch((err) => console.log(err))
}

module.exports = connect;