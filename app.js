var reader = require('./lib/csv/reader'),
    writer = require('./lib/csv/writer'),
    input = process.argv[2],
    output = process.argv[3],
    Sheet = require('./models/sheet'),
    csvAsArray, sheet;

console.log(`Parsing ${input} into ${output}`)

reader(input, (err, csvAsArray) => {
    sheet = new Sheet(csvAsArray);

    sheet.evaluate( (err, data) => {
        if (err) {
            console.log(`An error occurred evaluating ${input}: ${err.toString()}`);
            process.exit(1);
        }

        writer(output, data, (err, result) => {
            if (err) {
                console.log(`An error occurred writing the result to ${output}: ${err.toString()}`);
                process.exit(1);
            }

            console.log("Done.");
            process.exit(0);
        });
    });
});


