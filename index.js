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
    .catch(err=> {
        res.status(500).json({error : 
            "The users information could not be updated"
        });
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

//When the client makes a GET request to /api/users/:id
//1) If the user with the specified id is not found:
//-return HTTP status code 404 (Not Found).
//- return the following JSON object: { message: "The user with the specified ID does not exist." }.
// else return that user id with successful message

//2) If there is an error in retrieving user from database
//-cancel the request
//- respond with status code 500
//return the JSON object { error: "The user information could not be retrieved." }.

server.get('/api/users/:id', (req, res) =>{
    db.findById(req.params.id)
    .then(user => {
        if(!user) {
            res.status(404).json({message: "The user with the specified ID does not exist"});
        } else {
            res.status(200).json(user);
        }
    })
    .catch(err=> {
        res.status(500).json({error: "The user information could not be retrieved"});
    });
})


// When the client makes a delete request to /api/users/:id
////// if id is not found --
//////// 1) return HTTP status code 404 (Not Found).
//////// 2) return the following JSON object: { message: "The user with the specified ID does not exist." }.
////// if there is an error in removing the user from the database
////// 1) Cancel the request 
////// 2) respond with HTTP status code 500.
////// 3) return the following JSON object: { error: "The user could not be removed" }.


server.delete('/api/users/:id', (req, res) => {
    db.remove(req.params.id)
    .then(user => {
        if (!user) {
            res.status(404).json({error: "The user with the specified ID does not exist"})
        } else {
            res.end();
        }
    })

    .catch(err => {
        res.status(500).json({error: "The user could not be removed"})
    })
})

////





server.listen(4000, () => {
    console.log('\n*** Server Running on http://localhost:4000 ***\n')
})