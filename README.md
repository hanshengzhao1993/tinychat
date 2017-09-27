# README

Hello!

As the next step in the AeroFS recruiting process, we'd like you to do a
take-home development exercise. This exercise should take no longer than a
couple hours for the basic requirements.

Please send us back your results within the next two weeks--if you've got
travel or something else coming up and this timetable doesn't work for you,
just let us know and we'll push that back further.

Good luck, and we hope you have fun with this!

## Features
/****************** Updated ********************/
/****************** Updated ********************/

* display all previous messages
* user can type in new messages and it will render on the application
* data from previous sessions will persist(all data kept in the fakedata.json)
*** specify your name in the beginning(please make sure to be case sensitive)
*** edit previous messages
*** real time communication
*** really nice edit feature
*** Able to display URLs(limited to .com and https://)

## What files live where

/****************** Updated ********************/
/****************** Updated ********************/

* server : Three files in here app.js, jsonFileHelpers.js, fixtures/fakedata.json
  - app.js is the main server file written in Express
  - jsonFileHelpers.js is all the methods written for the callbacks in app.js
  - fixtures/fakedata.json is all the json data. I moved it here because I think it's better to have data in the server file.
* public: Files in here include: index.html, bundle.js, js(folder), style(folder), edit.jpg
  - index.html the main HTML page. It added bundle.js now because I wanted to tranpile so code.
  - bundle.js it's all the js files in js folder but just bundled up into one file(used webpack)
  - js(folder): Three files app.js, ajaxrequestHandlers.js, and appendDomHandler.js
    - app.js is the main entry file, have all the event listeners
    - ajaxrequestHandlers.js is used to handle all the ajax request(i used axios for ajax because it was promise based)
    - appendDomHandler.js is all the methods used to append elements to the DOM
  - style(folder) have the css file
  - Edit.jpg is a picture I added on the edit button
* webpack.config.js
  - used this to configure to tranpile and bundle the js files
* package.json
  - hold metadata relevant to the project

* `frontend_design_spec.md` and `backend_design_spec.md` still the same

## Starting the Application

/****************** Updated ********************/
/****************** Updated ********************/

Required to start the application:
- NodeJS

Steps to start the Applications:
Step 1:
  Install NodeJS(If it is not installed)
Step 2:
  Go into the root directory in the terminal
Step 3:
  npm install
  (this will install all the dependencies)
Step 4:
  npm run build
  (this will build a bundle file with all the javascript file for the html)
Step 5:
  npm start
  (start the server)
Step 6:
  go into a browser and open up localhost:3000
  (opens up a local version of the application)
Step 7:
  Enjoy the application!

## Testing the application

/****************** Updated ********************/
/****************** Updated ********************/

Username: upon opening the application please fill in the popup with your desired usename(CASE SENSITIVE: I had this choice so it seem's like a real chat);

Messaging: Just type into the input box and click send to add a message(upon typing it the message will render on the page)

RealTime Messaging: To see the real time messaging please open the application in an normal browswer and open the application in an incognito mode. Type in a different username than start messaging each other

Editing: You can only edit your previous messages, hover on messages you previously typed. Click the button then input the new message you want.

AddURLs: Just type in a URL into the input box and you will see it display like a link.(Limited to .com or https:// only)

