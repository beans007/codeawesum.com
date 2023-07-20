const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const casDBFunctions = require("./casDBFunctions.js");
const app = express();
const casLogin = express.Router();
const mysql = require('mysql');


// Resigter a User. Step 1, check if user exists
async function checkIfUserExists(database, email, password) {
    var length = 0;
    await casDBFunctions.submitQuerytoDB(database, `SELECT id FROM userData WHERE email='${email}'`)
        .then((result) => {
        length = JSON.parse(result.length);
    })
    if (length >= 1) {
        return('User Already Exists')
    } else {
        return('User Not Found')}

}

// Resigter a User. Step 2, add the user
async function addUser(database, email, password) {
    await casDBFunctions.submitQuerytoDB(database, `INSERT INTO userData (email, password) VALUES ('${email}', '${password}')`)
        .then((result) => {
    })
    return('New User Added')
}

// Delete a user.
async function deleteuser(database, email, password) {
    await casDBFunctions.submitQuerytoDB(database, `DELETE FROM userData WHERE email='${email}'`)
    return('User Deleted') 
}


// ---Start Here --- A registration request coming in
casLogin.post('/', (req, res, next) => {
    var responseobj = {
        objName: 'Response Object',
        message: ''}
    const {database, email, password, action} = req.body;
    if(action === 'register') {
        checkIfUserExists(database, email, password)
            .then((reply) => {
                if (reply==='User Already Exists') {
                    responseobj.message = reply;
                    res.send(responseobj)
                }
                else {
                    addUser(database, email, password)
                    .then((reply) => {
                        responseobj.message = reply;
                        res.send(responseobj)

                    })
                }
            })
        }
        if(action === 'delete') {
            deleteuser(database, email, password)
                .then ((reply) => {
                    responseobj.message = reply;
                    res.send(responseobj)
                })
        }
    }       
)



module.exports = casLogin;