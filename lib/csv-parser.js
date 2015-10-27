var fs = require('fs');

module.exports = (csv, cb) => {
    fs.readFile(`${csv}`, 'utf8', (err, data) => {
        if (err) cb(err, null);
        var raw = [];
        var lines = data.split("\n");
        var i = 0;
        lines.forEach((line) => {
            raw[i] = line.split(",");
            i++;
          })

       cb(null, raw);
    })
};