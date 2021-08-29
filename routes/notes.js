//  require modules
const notes = require("express").Router();
const util = require("util");
const fs = require("fs");
const app = require(".");

const readFromFile = util.promisify(fs.readFile);

module.exports = notes;
