var expect = require('chai').expect,
    helper = require('./../../helper'),
    Sheet = require('./../../../models/sheet'),
    sheet;

describe('The Sheet, with valid sample data', () => {

    beforeEach(() => {
        sheet = new Sheet(helper.sample);
    });

    describe('constructor function', () => {
        it('creates a sheet', (done) => {
            expect(sheet).to.not.be.null;
            done();
        });
    });

    describe('#resolve', function () {
        describe('error conditions', function() {
            it('cellname without letters', (done) => {
                sheet.resolve("45", [], function(err, result) {
                    expect(err).to.not.be.null;
                    expect(err.message).to.match(/Invalid cell name .*/);
                    done();
                });
            });

            it('cellname without numbers', (done) => {
                sheet.resolve("a", [], (err, result) => {
                    expect(err).to.not.be.null;
                    expect(err.message).to.match(/Invalid cell name .*/);
                    done();
                });
            });

            it('cellname with repeated lettering (e.g. a2b)', (done) => {
                sheet.resolve("a2b", [], (err, result) => {
                    expect(err).to.not.be.null;
                    expect(err.message).to.match(/Invalid cell name .*/);
                    done();
                });
            });
        });

    });

    describe('Rendering the calculated results', () => {
        it('renders the expected output for the sample data', (done) => {
            sheet.evaluate( (err, output) => {
                expect(output[0][0]).to.equal(-8);
                expect(output[0][1]).to.equal(-13);
                expect(output[0][2]).to.equal(3);
                expect(output[0][3]).to.equal('#ERR');
                expect(output[1][0]).to.equal(-8);
                expect(output[1][1]).to.equal(5);
                expect(output[1][2]).to.equal(0);
                expect(output[1][3]).to.equal(3.5);
                expect(output[2][0]).to.equal(0);
                expect(output[2][1]).to.equal('#ERR');
                expect(output[2][2]).to.equal(0);
                expect(output[2][3]).to.equal(14);
                done()
            });
        });
    });
});

function arrayWithDefaultValue(rows, cols, defaultVal) {
    var outer = [];
    var i = 0;

    while (i < rows) {
        i++;
        inner = [];
        var i2 = 0;

        while (i2 < cols) {
            inner[i2] = defaultVal;
            i2++;
        }
    }
    return outer;
}
