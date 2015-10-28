var expect = require('chai').expect,
    reader = require('./../../../../lib/csv/reader');

describe('loads the sample fixture', () => {
    it('without error', (done) => {
        //note, this path resolves when running mocha from the top level of the project, via make or manually
        reader('./data/sample.csv', (err, data) => {
            expect(err).to.be.null;
            done();
        });
    });

    it('into a correctly ordered 2D array', (done) => {
        reader('./data/sample.csv', (err, data) => {
            expect(data.length).to.equal(3);
            expect(data[0].length).to.equal(4);
            expect(data[0][3].trim()).to.equal('+');
            expect(data[1][3]).to.equal('7 2 /');
            expect(data[2][3]).to.equal('5 1 2 + 4 * + 3 -');
            done();
        });
    });
});

describe('reacts to error gracefully', () => {
    it('when the file does not exist', (done) => {
        reader('./nonexistent.csv', (err, data) => {
            expect(err).to.not.be.null;
            expect(data).to.be.null;
            done();
        });
    });
});

