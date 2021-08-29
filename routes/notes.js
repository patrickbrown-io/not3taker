//  require modules
const notes = require("express").Router();
const util = require("util");
const fs = require("fs");
const app = require(".");

//  helper for random id    //
const uuid = require('../helpers/uuid.js');
const data = require('../db/db.json')

/**
 *  Function to write data to the JSON file given a destination and some content
 *  @param {string} destination The file you want to write to.
 *  @param {object} content The content you want to write to the file.
 *  @returns {void} Nothing
 */

//////////  Functions / Util    //////////
const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) =>
    fs.writeFile(destination, JSON.stringify(content, null, 4),(err) =>
    err ? console.error(err) 
        : console.info (`DATA WRITTEN TO ${destination}`)
);

const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    }
)};
////////////                ///////////

// GET Notes
notes.get("", (req, res) => {
    console.log(`${req.method} request for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// notes.get('/api', (req,res) => {
//     console.log(`${req.method} request received for notes`);
//     readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
// });

//  POST
notes.post("", (req, res) => {
    console.log(`${req.method} request for notes`)

    const {title, text} = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };

    readAndAppend(newNote, "./db/db.json");

    const response = {
        status: 'success',
        body: newNote,
    };

    res.json(response)

    } else {
    res.json("Error in POST")
    }
});

module.exports = notes;
