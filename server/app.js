// node file system with promises
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const { addNewMessage, editMessage, getAllMessage } = require('./jsonFileHelpers.js');

// starting the application
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// static files
app.use(express.static(path.join(__dirname, '/../public')));

// Get all messages
app.get('/getAllMessages', getAllMessage);

// adding data into database
app.post('/addingNewMessage', addNewMessage);

// Edit Message
app.post('/editMessage', editMessage);

// use port 3000
app.listen(3000, () => {
  console.log('Listening on port 3000!');
});
