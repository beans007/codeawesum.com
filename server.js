const express = require('express');
const bodyParser = require('body-parser');
const casCalculator = require("./casModules/casCalculator.js");
const casDBFunctions = require("./casModules/casDBFunctions.js");
const casServer = require("./casModules/casServer.js");
const casDb = require("./casModules/casDb.js");
const casLogin = require("./casModules/casLogin.js");
const morgan = require('morgan')
const path = require('path');
const app = express();
app.use(express.static("./static/home"));
app.use(bodyParser.json());
app.use(morgan('dev'));

// server objest for storing server stuff
var serverobj = {
  requests: 0,
  firstStart: true
};

// check for first start, initialise databases and tables if not exist
if (serverobj.firstStart) {
  serverobj.firstStart = casDBFunctions.firstStartFunction();
}

// log how many requests have been made to this server since startup
  app.use((req, res, next) => {
    serverobj.requests = serverobj.requests + 1;
    console.log(`Server Request Counter: ${serverobj.requests}`)
    next()
  })

// routes
  app.use('/calculator', casCalculator);
  app.use('/server', casServer);
  app.use('/db', casDb);
  app.use('/register', casLogin)

 
// I am listening
   const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port : ${port}`);
});

