//  require modules
const notes = require("express").Router();
const util = require("util");
const fs = require("fs");
const app = require(".");

const uuid = require('../helpers/uuid.js');

const readFromFile = util.promisify(fs.readFile);


console.log(uuid());


module.exports = notes;
