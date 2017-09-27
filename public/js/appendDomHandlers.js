const messageBox = document.getElementById('messagebox');

export const addATagToSpan = (parentSpan, messageString)=>{
  let splitMessage = messageString.split(' ');
  splitMessage = splitMessage.map((word)=>{
    if(word.includes('https://') || word.includes('.com')){
      let aTag = document.createElement('A');
      aTag.setAttribute('href', word);
      aTag.text = word + ' ';
      return aTag;
    }else {
      let spanTag = document.createElement('SPAN');
      spanTag.innerHTML = `${word} `;
      return spanTag
    }
  });
  splitMessage.forEach( (eleTag)=>{
    parentSpan.appendChild(eleTag);
  })
};

export const addEditButtonToLI = (parent)=>{
  let editButton = document.createElement('BUTTON');
  editButton.innerHTML = `<img src="edit.jpg" />`;
  editButton.setAttribute('class', 'edit-button');
  editButton.setAttribute('data-toggle', 'modal');
  editButton.setAttribute('data-target', '#exampleModal');
  editButton.setAttribute('data-whatever', '@mdo');
  parent.appendChild(editButton);
};

export const renderJSONMessage = (messagesObject, currentUser)=>{
  let messages = messagesObject.data.messages;

  // append each message into messageBox
  messages.forEach((message)=>{
    // object destructor
    let {content, author, id} = message;
    let currentMessage = document.createElement('LI');
    currentMessage.setAttribute('id', id);
    let authorSpan = document.createElement('SPAN');
    let messageSpan = document.createElement('SPAN');
    messageSpan.innerHTML = ": ";
    authorSpan.innerHTML = author;
    authorSpan.setAttribute('class', 'author-text');

    // Added A Tag
    if(content.includes('https://') || content.includes('.com')){
      addATagToSpan(messageSpan, content);
    } else {
      // Not adding A Tag
      messageSpan.innerHTML = messageSpan.innerHTML + message.content;
    }
    currentMessage.appendChild(authorSpan);
    currentMessage.appendChild(messageSpan);
    if(author === currentUser){
      addEditButtonToLI(currentMessage)
    }
      messagebox.appendChild(currentMessage);
  })
  moveToBottomOfChat(messageBox);
}

export const appendMessageToHTML = (message, currentUser) =>{
    let {message: messageObj} = message;
    let {content: contentMessage} = messageObj;
    let newMessage = document.createElement('LI');
    let authorSpan = document.createElement('SPAN');
    let messageSpan = document.createElement('SPAN');
    messageSpan.innerHTML = ": ";
    authorSpan.innerHTML = messageObj.author;
    authorSpan.setAttribute('class', 'author-text');
    // check for an website
    if(contentMessage.includes('https://') || contentMessage.includes('.com') ){
      addATagToSpan(messageSpan, contentMessage);
    } else {
      // if there is no https in the string just add the content to span
      messageSpan.innerHTML = messageSpan.innerHTML + messageObj.content;
    }

    newMessage.appendChild(authorSpan);
    newMessage.appendChild(messageSpan);
    newMessage.setAttribute('id', messageBox.children.length + 1);
    if(messageObj.author === currentUser){
      addEditButtonToLI(newMessage);
    }
    messageBox.appendChild(newMessage);
    moveToBottomOfChat(messageBox);
  }

export const moveToBottomOfChat = (messageBox)=>{
  messageBox.scrollTop = messageBox.scrollHeight;
};