const fse = require('fs-extra');
const path = require('path');

const jsonFileHelpers = {
  getAllMessage: (req, res) => {
    fse.readJson(path.join(`${__dirname}/fixtures/fakedata.json`))
      .then((jsonFile) => {
        res.send(jsonFile);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  addNewMessage: (req, res) => {
    fse.readJson(path.join(`${__dirname}/fixtures/fakedata.json`))
      .then((jsonFile) => {
        const messageObj = req.body;
        messageObj.id = jsonFile.messages.length + 1;
        jsonFile.messages.push(messageObj);
        return fse.writeJson(path.join(`${__dirname}/fixtures/fakedata.json`), jsonFile);
      })
      .then(() => {
        res.send('Added Message');
      })
      .catch((err) => {
        console.log(err);
      });
  },
  editMessage: (req, res) => {
    fse.readJson(path.join(`${__dirname}/fixtures/fakedata.json`))
      .then((jsonFile) => {
        const { content, id } = req.body;
        const { messages } = jsonFile;
        messages[parseInt(id, 10) - 1].content = content;
        return fse.writeJson(path.join(`${__dirname}/fixtures/fakedata.json`), jsonFile);
      })
      .then(() => {
        res.send('Got the info');
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

module.exports = jsonFileHelpers;
