var async = require('async'),
    parse = require('./../lib/postfix-parser'),
    constants = require('./constants'),
    alphabetConverter = require('./../lib/alphabet-converter'),
    Sheet;

Sheet = function(data) {
    this.data = data;
    this.evaluatedData = [];

    //initialise evaluatedData as an empty 2D structure to collect results for processed data
    var i = 0;
    this.data.forEach( (datum) => {
        var i2 = 0;
        this.evaluatedData[i] = [];
        datum.forEach( (innerDatum) => {
            this.evaluatedData[i][i2] = null;
            i2++;
        });
        i++;
    });
};

Sheet.prototype.resolve = function (cellName, dependencyPath, cb) {
    var letters, row, col;

    //1. convert the cellName to an array location. If this can't be done, hand the cb a boundary error
    try {
        var lettersAndNumbers = alphabetConverter.toLettersAndNumbers(cellName)
        letters = lettersAndNumbers[0];
        row = lettersAndNumbers[1] - 1; //adjust for array indexing
    }
    catch (err) {
        return cb({ message: err.message }, null);
    }

    col = alphabetConverter.alphabetToArrayIndex(letters);

    //at this moment we check for circular dependencies to avoid cells referencing each other infinitely.
    //if there is a cycle, we mark this result as an ERR
    if (dependencyPath.indexOf(cellName) >= 0) {
        this.evaluatedData[row][col] = constants.ERR;
        return cb({ message: constants.ERR }, null);
    }

//    console.log('No previously identified errors for cellName ', cellName, ' continuing ... ')

    if (this.evaluatedData[row][col] === null) {
        parse(cellName, this.data[row][col], dependencyPath, this, (err, val) => {
            if (err) {
                this.evaluatedData[row][col] = constants.ERR;
                return cb({ message: constants.ERR }, null);
            }
            this.evaluatedData[row][col] = val;
            return cb(null, this.evaluatedData[row][col]);
        });
    }
    else {
        return cb(null, this.evaluatedData[row][col]);
    }
};

Sheet.prototype .evaluate = function(cb) {
    var rows = 0;
    var cols = 0;

    var cellEvaluator = (cell, cb) => {
        this.resolve()
    }

    async.each(this.data, cellEvaluator)
}


module.exports = Sheet;
