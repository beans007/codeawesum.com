const express = require('express');
const mysql = require('mysql2');
const casBudget = express.Router();

casBudget.post('/', (req, res, next) => {
    console.log(req.body.path);
    if (req.body.path === 'ADD ENVELOPE') {
        addEnvelopeFunc(req, res);
    };

    if (req.body.path === 'DELETE ENVELOPE') {
        deleteEnvelopeFunc(req, res);
    };

    if (req.body.path === 'EDIT ENVELOPE') {
        editEnvelopeFunc(req, res);
    };

    if (req.body.path === 'ADD TRANSACTION') {
        addTransactionFunc(req, res);
    };

    if (req.body.path === 'DELETE TRANSACTION') {
        deleteTransactionFunc(req, res);
    };
    
    if (req.body.path === 'EDIT TRANSACTION') {
        console.log("Edit Transaction if ...");
        editTransactionFunc(req, res);
    };

    if (req.body.path === 'GET') {
        //do nothing, just continue and return data
    };

    /*dbquery = (`SELECT * FROM envelopes;`);
    readfromDB(dbquery,res);*/
    readfromDB(res);
  
})

//Envelopes
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

function editEnvelopeFunc(req,res) {
    console.log("Edit Envelope ...");
    const evelopeId = req.body.envelopeId;
    const evelopeAmount = req.body.envelopeAmount;
    console.log(evelopeId,evelopeAmount);
    dbquery = (`UPDATE envelopes SET amount = ${evelopeAmount} WHERE id=${evelopeId};`);
    writetoDB(dbquery);
}
//Transactions

function addTransactionFunc(req, res) {
    console.log("Add New Transaction ...");
    const addTransactionEnvelopeId = req.body.addTransactionEnvelopeId
    const addTransactionDescription = req.body.addTransactionDescription
    const addTransactionAmount = req.body.addTransactionAmount
    dbquery = (`INSERT INTO transactions(description, amount, envelopeid) VALUES('${addTransactionDescription}', ${addTransactionAmount}, ${addTransactionEnvelopeId});`);
    writetoDB(dbquery);
};

function deleteTransactionFunc(req, res) {
    console.log("Delete Transaction ...");
    const deleteTransactionid = req.body.deleteTransactionid;
    dbquery = (`DELETE FROM transactions WHERE id=${deleteTransactionid};`);
    writetoDB(dbquery);
}

function editTransactionFunc(req, res) {
    console.log("Edit Transaction ...");
    const editTransactionid = req.body.editTransactionId;
    const editTransactionAmount = req.body.editTransactionAmount;
    dbquery = (`UPDATE transactions SET amount = ${editTransactionAmount} WHERE id=${editTransactionid};`);
    writetoDB(dbquery);
}



//Other
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


async function readfromDB(res) {   
    const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: 'password',
    database: 'budget'
    });
    dbquery = (`SELECT * FROM envelopes;`);
    var submit = await connection.promise().query(dbquery);
    const envelopeTable = await submit;
    //console.log(envelopeTable[0]);

    dbquery = (`SELECT * FROM transactions;`);
    submit = await connection.promise().query(dbquery);
    const tranactionsTable = await submit;
    //console.log(tranactionsTable[0]);
    var reply = [];
    reply.push(envelopeTable[0]);
    reply.push(tranactionsTable[0])
    //console.log(reply);
    res.send(JSON.stringify(reply));
 
}





module.exports = casBudget;