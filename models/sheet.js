var parse = require('./../lib/postfix-parser'),
    Sheet;

Sheet = function(data) {
    this.data = data;
    this.evaluatedData = [];
};

Sheet.prototype.resolve = (cellName, dependencyPath, cb) => {
    var letters, row, col;

    //1. convert the cellName to an array location. If this can't be done, hand the cb a boundary error
    try {
        var lettersAndNumbers = toLettersAndNumbers(cellName)
        letters = lettersAndNumbers[0];
        row = lettersAndNumbers[1];
    }
    catch (err) {
        return cb({ message: err.message }, null);
    }

    col = alphabetToArrayIndex(letters);

    if (typeof evaluatedData[row][col] === 'undefined') {
        evaluatedData[row][col] = parse(data[row][col], dependencyPath, this, cb);
    }

    cb();
}

function toLettersAndNumbers(cellName) {
    //locate the alphabetic portion
    var lettersAndNumbers = cellName.match(/[a-zA-Z]+|[0-9]+/g);

    if (lettersAndNumbers.length != 2) {
        throw new Error("Invalid cell name [" + cellName + "]");
    }

    return lettersAndNumbers;
};

//the char 'A' is at position 65 in Unicode
const ALPHABET_OFFSET = 65;

function alphabetToArrayIndex(letters) {
    //single or multiple letters?
    if (letters.length > 1) {
        var repeatingCount = ALPHABET_OFFSET;
        letters.forEach( (letter) => {
           repeatingCount += alphabetToArrayIndex(letter + '0');
        });

        return repeatingCount;
    }

    var unicodePosition = char.charCodeFrom();
    return unicodePosition - ALPHABET_OFFSET;
};

module.exports = Sheet;
