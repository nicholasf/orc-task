//the char 'A' is at position 65 in Unicode, we need it to correspond to array index 0.
const UNICODE_ALPHABET_OFFSET = 65;

//the length of the alphabet sequence at which it needs to repeat alphabet letters
const ALPHABET_LIMIT = 26;

module.exports.toLettersAndNumbers = (cellName) => {
    //locate the alphabetic portion
    var lettersAndNumbers = cellName.match(/[a-zA-Z]+|[0-9]+/g);

    if (lettersAndNumbers.length != 2) {
        throw new Error("Invalid cell name [" + cellName + "]");
    }

    return lettersAndNumbers;
};

module.exports.alphabetToArrayIndex = (letters) => {
    //single or multiple letters?
    if (letters.length > 1) {
        var repeatingCount = UNICODE_ALPHABET_OFFSET;
        letters.forEach( (letter) => {
            repeatingCount += alphabetToArrayIndex(letter + '0');
        });

        return repeatingCount;
    }

    //now we know letters is 1 character long
    var unicodePosition = letters.charCodeAt();
    return unicodePosition - UNICODE_ALPHABET_OFFSET;
};

module.exports.arrayIndexToAlphabet = (index) => {
    var letter = '';
    var lastLetter = '';
    var numberOfLetters = parseInt(index / ALPHABET_LIMIT);

    if (numberOfLetters >= 1) {
        var remainder = index % ALPHABET_LIMIT;
        lastLetter = String.fromCharCode(remainder + UNICODE_ALPHABET_OFFSET);

        for (var i = 0; i <= numberOfLetters; i++) {

            if (i == numberOfLetters) {
                letter += lastLetter;
            }
            else {
                letter += 'A';
            }
        }
    }
    else {
        letter = String.fromCharCode(index + UNICODE_ALPHABET_OFFSET);
    }

    return letter;
}
