// implement your API here
const express = require('express');

const db= require('./data/db');

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
    res.send('hello you')
})

//R in crud
// Gets all the users in the given array
//gets all the users in this array

server.get('/api/users', (req, res) => {

    db.find()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(({code, message})=> {
        res.status(code).json({
            succes:false, message, 
        })
    })
})





server.listen(4000, () => {
    console.log('\n*** Server Running on http://localhost:4000 ***\n')
})