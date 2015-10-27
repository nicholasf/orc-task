var csvParser = require('./lib/csv-parser'),
    input = process.argv[2],
    output = process.argv[3],
    csvAsArray;

const ALPHABET_LIMIT = 26;

console.log(`Parsing data/${input} into ${output}`)

csvAsArray = csvParser(input);

if (cvsAsArray.length > ALPHABET_LIMIT) {
    console.log('Too many rows')
}

