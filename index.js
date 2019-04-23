//imports express on all version of node.js
const express = require('express');

const server = express();

//import the data file/database
const db = require('./data/db');


//allows the server to read/write json(parse it)
server.use(express.json())

server.get('/', (req, res) => {
  res.send('I am here');
});

//get request to return a list of hubs in json format
server.get('/hubs', (req, res) => {
  db.hubs
    .find()
    .then( hubs => {
      //adding the status code will help remember part of what was going on, default is 200
      res.status(200).json(hubs);
    })
    .catch( err => {
      res.json({ error: err, message:"you've lost the sauce" });
    });
})

server.post('/hubs', (req, res) => {
//grabbing data from the client by using the requests body
//axios.post(url, data) => the data is the body
  const hubsinformation = req.body;
  console.log('request body', hubsinformation);
  db.hubs
    .add(hubsinformation)
    .then( hubs => {
      res.status(201).json(hubs);
    })
    .catch( err => {
      res.json({ error: err, message:'mailman dropped your package broski' });
    })
})


server.delete('/hubs/:id', (req, res) => {
  // axios.delete(.../hubs/${id})
  const ID = req.params.id // req.params has the URL parameters
  db.hubs
    .remove(ID)
    .then( hubs => {
      //res.status(200).json(hubs)
      res.status(204).end() //shows a response with no code
    })
    .catch( err => {
      res.json({ error: err, message:"it's still here, quick get rid of it" })
    })
})


server.listen(5000, () => {
  console.log('\n API started on port 5000 \n')
});



/* 
install express (yarn add express) 
run yarn server
*/