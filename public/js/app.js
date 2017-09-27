/* Stub JS file for your tinychat app! */
import { editMessage, addNewMessage, fetchAllMessages } from './ajaxrequestHandler.js';
import { appendMessageToHTML } from './appendDomHandlers.js';
// PubNub API Keys
export const pubnub = new PubNub({
  publishKey: 'pub-c-b055fc84-8929-4560-9e58-46f5a159decf',
  subscribeKey: 'sub-c-a19ded7a-a1b9-11e7-a3e4-2e10596cd186',
  ssl: true,
});
$(document).ready(function () {
  const currentUserName = document.getElementById('currentUserName');
  const sendButton = document.getElementById('sendMessage');
  const sendingMessage = document.getElementById('message');
  const messageBox = document.getElementById('messagebox');
  const editButton = document.getElementById('change-message-now');
  const changeInput = document.getElementById('recipient-name');
  // Getting Current Username
  const gettingUserName = prompt('What is your name?');

  // Put username into the currentUserName/h3 tag
  if (gettingUserName === null || gettingUserName.trim().length === 0) {
    currentUserName.innerHTML += 'Anonymous';
  } else {
    currentUserName.innerHTML += gettingUserName;
  }

  // fetch all current messages
  fetchAllMessages(gettingUserName);

  const addMessage = () => {
    const userMessageValue = sendingMessage.value;
    if (userMessageValue.length === 0) {
      alert('please add a message');
    } else {
      const userNameValue = currentUserName.innerHTML.slice(18);
      const messageObject = {
        editing: false,
        author: userNameValue,
        content: userMessageValue,
        timestamp: (new Date()).getTime(),
        previousTextChanged: false,
      };

      pubnub.publish({
        message: messageObject,
        channel: 'tiny_chat',
      }, function (status) {
        if (status.statusCode === 200) {
          console.log('Message Send');
        } else {
          // error with sending message
          console.log(status);
        }
      });
      // add new message to Json file
      addNewMessage(messageObject);
      sendingMessage.value = '';
    }
  };

  let parent = null;
  // Added Event Listener to the whole message box
  messageBox.addEventListener('click', function (event) {
    // Event Delegation
    let clickedButton = null;
    let indexOfButton = null;
    // trying to fid the button element
    for (let i = 0; i < event.path.length; i++) {
      if (event.path[i].nodeName === 'BUTTON') {
        clickedButton = event.path[i];
        indexOfButton = i;
        break;
      }
    }
    if (clickedButton) {
      // getting the acces to the parent element
      parent = event.path[indexOfButton + 1];
    }
  });

  // Event Listener on the edit button
  editButton.addEventListener('click', () => {
    const newMessage = changeInput.value;
    const changedMessageObject = {
      editing: true,
      id: parent.id,
      content: newMessage,
    };
    editMessage(changedMessageObject);
    changeInput.value = '';
  });

  // Add Click Event on Send Button
  sendButton.addEventListener('click', addMessage);

  // Add EventListener to Input box on enter
  sendingMessage.addEventListener('keypress', (event) => {
    if (event.keyCode === 13) {
      addMessage();
    }
  });

  // PubNub Event Listener
  pubnub.addListener({
    status(status) {
      if (status.category === 'PNConnectedCategory') {
      // console.log('status', status)
      }
    },
    message(response) {
      if (response.message.previousTextChanged) {
        // empty the chat first
        messageBox.innerHTML = '';
        // fetch all the chat again
        fetchAllMessages(gettingUserName);
      } else {
        // append message to UL
        appendMessageToHTML(response, gettingUserName);
      }
    },
  });

  // subscript to a channel
  pubnub.subscribe({
    channels: ['tiny_chat'],
  });
});
