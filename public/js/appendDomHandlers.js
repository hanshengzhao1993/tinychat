const messageBox = document.getElementById('messagebox');
const messageBoxContainer = document.getElementById('messagebox-parent');

export const moveToBottomOfChat = (messagingBox) => {
  messagingBox.scrollTop = messagingBox.scrollHeight;
};

export const addATagToSpan = (parentSpan, messageString) => {
  let splitMessage = messageString.split(' ');
  splitMessage = splitMessage.map((word) => {
    if (word.includes('https://') || word.includes('.com')) {
      const aTag = document.createElement('A');
      aTag.setAttribute('href', word);
      aTag.text = `${word} `;
      return aTag;
    } else {
      const spanTag = document.createElement('SPAN');
      spanTag.innerHTML = `${word} `;
      return spanTag;
    }
  });
  splitMessage.forEach((eleTag) => {
    parentSpan.appendChild(eleTag);
  });
};

export const addEditButtonToLI = (parent) => {
  const editButton = document.createElement('BUTTON');
  editButton.innerHTML = `<img src='edit.jpg' />`;
  editButton.setAttribute('class', 'edit-button');
  editButton.setAttribute('data-toggle', 'modal');
  editButton.setAttribute('data-target', '#exampleModal');
  editButton.setAttribute('data-whatever', '@mdo');
  parent.appendChild(editButton);
};

export const renderJSONMessage = (messagesObject, currentUser) => {
  const messages = messagesObject.data.messages;

  // append each message into messageBox
  messages.forEach((message) => {
    // object destructor
    const { content, author, id } = message;
    const currentMessage = document.createElement('LI');
    currentMessage.setAttribute('id', id);
    const authorSpan = document.createElement('SPAN');
    const messageSpan = document.createElement('SPAN');
    messageSpan.innerHTML = ': ';
    authorSpan.innerHTML = author;
    authorSpan.setAttribute('class', 'author-text');

    // Added A Tag
    if (content.includes('https://') || content.includes('.com')) {
      addATagToSpan(messageSpan, content);
    } else {
      // Not adding A Tag
      messageSpan.innerHTML += message.content;
    }
    currentMessage.appendChild(authorSpan);
    currentMessage.appendChild(messageSpan);
    if (author === currentUser) {
      addEditButtonToLI(currentMessage);
    }
    messagebox.appendChild(currentMessage);
  });
  moveToBottomOfChat(messageBox);
};

export const appendMessageToHTML = (message, currentUser) => {
  const { message: messageObj } = message;
  const { content: contentMessage } = messageObj;
  const newMessage = document.createElement('LI');
  const authorSpan = document.createElement('SPAN');
  const messageSpan = document.createElement('SPAN');
  messageSpan.innerHTML = ': ';
  authorSpan.innerHTML = messageObj.author;
  authorSpan.setAttribute('class', 'author-text');
  // check for an website
  if (contentMessage.includes('https://') || contentMessage.includes('.com')) {
    addATagToSpan(messageSpan, contentMessage);
  } else {
    // if there is no https in the string just add the content to span
    messageSpan.innerHTML += messageObj.content;
  }

  newMessage.appendChild(authorSpan);
  newMessage.appendChild(messageSpan);
  newMessage.setAttribute('id', messageBox.children.length + 1);
  if (messageObj.author === currentUser) {
    addEditButtonToLI(newMessage);
  }
  messageBox.appendChild(newMessage);
  moveToBottomOfChat(messageBoxContainer);
};
