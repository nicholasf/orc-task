var expect = require('chai').expect,
    parse = require('./../../../lib/postfix-parser'),
    helper = require('./../../helper'),
    Sheet = require('./../../../models/sheet'),
    sheet, parser;

describe('PostfixParser', () => {
    describe('evaluating expressions without references', () => {
        //note, sheet is actually undefined here but that's okay, the parser only needs it to resolve references
        it('parses "3"', (done) => {
            parse('3', [], sheet, (err, value) => {
                expect(err).to.be.null;
                expect(value).to.equal(3);
                done();
            });
        });

        describe('the four basic operations', () => {
            describe('+', () => {
               it('parses 1 + 1', (done) => {
                    parse('1 1 +', [], sheet, (err, val) => {
                        expect(err).to.be.null;
                        expect(val).to.equal(2);
                        done();
                    })
               });
            });
        })
    });
});