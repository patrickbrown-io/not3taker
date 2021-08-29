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

const readAndDelete = (content, path) => {
    fs.readFile(path, 'utf8', (err,data) => {
        if(err) throw err;
        else {
            const parsedNotes = JSON.parse(data);
            
            for (let i = 0; i < parsedNotes.length; i++) {
                if (parsedNotes[i].id === deleteNote) {
                    parsedNotes.splice([i], 1);
                    }
            }
      console.log(parsedNotes);
      writeToFile(file,parsedNotes)
        }
    })
};
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

//  DELETE
notes.delete('/*', (req, res) => {
    console.log(`${req.method} request recieved`);

    const specifiedNote = req.params[0];
    readAndDelete(specifiedNote, './db/db.json');
    res.json('Note successfully deleted');
});

module.exports = notes;
