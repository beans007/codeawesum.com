const express = require('express');
const casCalculator = express.Router();
const os = require('os');

//---------------------------------------------------


casCalculator.post('/', (req, res, next) => {
    var result = 0;
    if (req.body.calculation === "interest") {
        var amount = Number(req.body.amount); 
        var interest = Number(req.body.interest);
        var term = Number(req.body.term);
        for (let i = 0; i < (req.body.term); i++) {
            amount = amount*interest/12/100 + amount;
        }
        result = amount.toFixed(2);
    }
    else {
        console.log('Calculator Function: Calculation type: Not Found !')
    }
    result = {result: result}
    console.log(result);
    res.send(result);
})

/*calculator = function(req) {
 
}*/
//---------------------------------------------------

//exports.calculator = calculator;
//exports.serverstatus = serverstatus;
module.exports = casCalculator;