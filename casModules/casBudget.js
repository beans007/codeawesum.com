const express = require('express');
const mysql = require('mysql2');
const casBudget = express.Router();

casBudget.post('/', (req, res, next) => {
    if (req.body.path === 'POST') {
        addEnvelopeFunc(req, res);
    };

    if (req.body.path === 'DELETE') {
        deleteEnvelopeFunc(req, res);
    };
    
    if (req.body.path === 'GET') {
        //do nothing, just continue and return data
    };

    dbquery = (`SELECT * FROM envelopes;`);
    readfromDB(dbquery,res);
  
})

function addEnvelopeFunc(req, res) {
    console.log("Add New Envelope ...");
    const envelopeName = req.body.envelopeName;
    const envelopeAmount = req.body.envelopeAmount;
    dbquery = (`INSERT INTO envelopes(description, amount) VALUES('${envelopeName}', ${envelopeAmount});`);
    writetoDB(dbquery);
}

function deleteEnvelopeFunc(req,res) {
    console.log("Delete Envelope ...");
    const evelopeId = req.body.envelopeId;
    dbquery = (`DELETE FROM envelopes WHERE id=${evelopeId};`)
    writetoDB(dbquery);
}

async function writetoDB(dbquery) {   
    const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: 'password',
    database: 'budget'
    });
    const submit = await connection.promise().query(dbquery);
    const result = JSON.stringify(submit);
}


async function readfromDB(dbquery,res) {   
    const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: 'password',
    database: 'budget'
    });
    const submit = await connection.promise().query(dbquery);
    result = await submit;
    //console.log(result[0]);
    res.send(JSON.stringify(result[0]));
 
}




module.exports = casBudget;