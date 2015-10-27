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
                sheet.resolve("A", [], (err, result) => {
                    expect(err).to.not.be.null;
                    expect(err.message).to.match(/Invalid cell name .*/);
                    done();
                });
            });

            it('cellname with repeated lettering (e.g. A2B)', (done) => {
                sheet.resolve("A2B", [], (err, result) => {
                    expect(err).to.not.be.null;
                    expect(err.message).to.match(/Invalid cell name .*/);
                    done();
                });
            });
        });

    });
});


describe('The Sheet, with data conditions not depicted in the sample set', () => {

    describe('column lists longer than the alphabet - e.g. AA, BB, etc.', () => {
        it('can access them successfully using standard spreadsheet notation', (done) => {
            //create an array that exceeds the 26 letter limit of the alphabet, so we can test 'AA1'
            var data = arrayWithDefaultValue(1, 27, 0);
            sheet = new Sheet(data);
            sheet.resolve('AA1', [], (err, result) => {
                expect(err).to.be.null;
                expect(result).to.equal(0);
            })
            done();
        })
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