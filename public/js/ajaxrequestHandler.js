import { pubnub } from './app.js';
import { renderJSONMessage } from './appendDomHandlers.js';

// Get All Message From JSON file
export const fetchAllMessages = (username) => {
  axios.get('/getAllMessages')
    .then(function (response) {
      console.log(response);
      renderJSONMessage(response, username);
    })
    .catch(function (error) {
      console.log(error);
    });
};

// Add New message to JSON file
export const addNewMessage = (messageObj) => {
  axios.post('/addingNewMessage', messageObj)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};

// Edit Message from the JSON file
export const editMessage = (changedObj) => {
  axios.post('/editMessage', changedObj)
    .then((response) => {
      // send changed message up to pubnub
      pubnub.publish({
        message: {
          previousTextChanged: true,
        },
        channel: 'tiny_chat',
      }, function (status) {
        if (status.statusCode === 200) {
          console.log('Message Send');
        } else {
          console.log(status);
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
