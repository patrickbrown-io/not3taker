//require modules
const express = require('express');
const path = require('path');
const apiRouter = require('./routes/apiroutes.js')

//init port + express
const PORT = process.env.PORT || 3001;
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api', apiRouter);

//public
app.use(express.static("public"));

// // GET route - home
app.get('/',(req,res) =>
    res.sendFile(path.joing(__dirname, "/public/index.html"))
);
app.get('*', (req,res)=>
    res.sendFile(path.join(__dirname, "/public/index.html"))
);

// // GET route - notes
app.get('/notes',(req,res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () =>
  console.log(`Connection at http://localhost:${PORT} 🚀`)
);