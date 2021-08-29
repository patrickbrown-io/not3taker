//initialize express
const express = require("express");
const app = express();
//Modular route to notesRouter.js
const noteRouter = require("./notes");

//Middleware to direct to notes Router
app.use("/notes", noteRouter);

module.exports = app;