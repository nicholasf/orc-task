var fs = require('fs');

module.exports = (filename, data, cb) => {
    var csvData = '';

    data.forEach( (row) => {
        csvData += row.join(", ");
        csvData += "\n";
    });

    fs.writeFile(filename, csvData, 'utf8', (err) => {
        if (err) cb(err, null);
        return cb(null);
    });
};