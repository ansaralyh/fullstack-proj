const express = require('express');
const cors = require("cors");
const morgan = require("morgan");
const connect = require("./database/conn");
const router = require('./router/route') 


const app = express()

// middlewares


app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))
app.disable('x-powered-by') // less hackers will know about our stack
// http get request


const port = 8080;
app.get('/',(req,res)=>{
    res.status(201).json("Home Get Request");
});


// ** API routes
app.use('/api', router)


 
// start server only when we have only valid connection


connect().then(() => {
    try {
        app.listen(port, () => {
            console.log(`Server connected to http://localhost:${port}`);
        });
    } catch (error) {
        console.log('Cannot connect to the server');
    }
}).catch(error=> {
    console.log(error )
    console.log('invalid database connection')
})


