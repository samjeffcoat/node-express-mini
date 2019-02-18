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

//C in Crud
//Creates a user using the information sent inside the request body.
//If the request body is missing the name or bio property:
//-cancel the request.
//-respond with HTTP status code 400 (Bad Request).
//-return the following JSON response: { errorMessage: "Please provide name and bio for the user." }.

server.post('/api/users', (req, res) => {
   let user= req.body
// verifies that user infor is  contained in the request
if (!user.name || !user.bio){ 
    res.status(400).json({error: "Please provide name and bio info for the user"}) ;
    return;
}
    db.insert(user)
    .then(user => {
        res.status(201).json({success: true, user});
    })
    .catch(err => {
        res.status(500).json({ err: "There was an error while saving the user to the database"
        });
    });

})





server.listen(4000, () => {
    console.log('\n*** Server Running on http://localhost:4000 ***\n')
})