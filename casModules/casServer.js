const express = require('express');
const casServer = express.Router();
const os = require('os');

casServer.get('/', (req,res) => {
    console.log('Route Reqested: "/server"');
    res.json(serverstatus());
  });


serverstatus = function() {
    const reply = {
    server: os.hostname(),
    active: os.uptime(),
    load: os.loadavg(),
    }
    return(reply)
}
module.exports = casServer;