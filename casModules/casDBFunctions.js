const express = require('express');
const app = express();
const casLogin = express.Router();
const mysql = require('mysql2');


// Server starting up. Lets initialise databases and tables if not exist
function firstStartFunction() {
    //console.log('casServer - Initializing Databases ...');
    dbquery = (`CREATE DATABASE IF NOT EXISTS wineroutes;`);
    submitQuerytomysql(dbquery);
    dbquery = `CREATE TABLE IF NOT EXISTS userData (id INTEGER PRIMARY KEY AUTO_INCREMENT, email TEXT NOT NULL, password TEXT NOT NULL, session TEXT);`;
    submitQuerytoDB('wineroutes', dbquery);
    dbquery = 'SELECT * FROM userData;'
    //console.log(submitQuerytoDB('wineroutes', dbquery));
    return('false');
    };
    
function submitQuerytomysql(dbquery) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'user',
        password: 'password'
        });
        connection.query(dbquery, (err,result) => {
            if (err) {
                console.log(`Error`)
                throw err};
            //console.log(`${dbquery}': Success`);
        })
    }



// This function submits any the query to the database and returns a response
async function submitQuerytoDB(database, dbquery) {
    
            const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'user',
            password: 'password',
            database: database
        });
        const submit = await connection.promise().query(dbquery);
        const result = JSON.stringify(submit[0]);
        return(JSON.parse(result));
}

module.exports = {firstStartFunction, submitQuerytoDB}