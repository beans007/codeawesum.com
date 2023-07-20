const express = require('express');
const casDb = express.Router();
const mysql = require('mysql2')
const app=express();
connection = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: 'password',
    database: 'wineroutes'
    });


casDb.get('/', (req, res, next) => {

    res.send("DB Endpoint");
})


module.exports = casDb;