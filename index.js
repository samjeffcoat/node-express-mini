// implement your API here
const express = require('express');

const db= require('./data/db');

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
    res.send('hello you')
})




server.listen(4000, () => {
    console.log('\n*** Server Running on http://localhost:4000 ***\n')
})