//  require modules
const notes = require("express").Router();
const util = require("util");
const fs = require("fs");
const app = require(".");
//  helper for random id    //
const uuid = require('../helpers/uuid.js');

//  Functions / Util
const readFromFile = util.promisify(fs.readFile);

const writeToFile = (path, content) =>
    fs.writeFile(path, JSON.stringify(content,null,4),(err) =>
    err ? console.error(err) 
        : console.info (`DATA WRITTEN TO ${path}`));

const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err,data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    }
)};
// GET Notes
notes.get('', (req, res) => {
    console.log(`${req.method} request for /api/notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
})


module.exports = notes;
