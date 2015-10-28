var expect = require('chai').expect,
    parse = require('./../../../lib/postfix-parser'),
    helper = require('./../../helper'),
    Sheet = require('./../../../models/sheet'),
    sheet, parser;

describe('PostfixParser', () => {
    describe('evaluating expressions without references', () => {
        //note, sheet is actually undefined here but that's okay, the parser only needs it to resolve references
        it('parses "3"', (done) => {
            parse('a1', '3', [], sheet, (err, value) => {
                expect(err).to.be.null;
                expect(value).to.equal(3);
                done();
            });
        });

        describe('the four basic operations', () => {
            describe('+', () => {
               it('evaluates 1 + 1', (done) => {
                    parse('a1', '1 1 +', [], sheet, (err, val) => {
                        expect(err).to.be.null;
                        expect(val).to.equal(2);
                        done();
                    });
               });
            });

            describe('-', () => {
                it('evaluates 1 - 1', (done) => {
                    parse('a1', '1 1 -', [], sheet, (err, val) => {
                        expect(err).to.be.null;
                        expect(val).to.equal(0);
                        done();
                    });
                });
            });

            describe('*', () => {
                it('evaluates 2 5 3 * -', (done) => {
                    parse('a1', '2 5 3 * -', [], sheet, (err, val) => {
                        expect(err).to.be.null;
                        expect(val).to.equal(-13);
                        done();
                    });
                });
            });

            describe('/', () => {
                it('evaluates 7 2 /', (done) => {
                    parse('a1', '7 2 /', [], sheet, (err, val) => {
                        expect(err).to.be.null;
                        expect(val).to.equal(3.5);
                        done();
                    });
                });
            });
        });
    });

    describe('a simple two cell csv A1 references B1', () => {
        var data;
        beforeEach( () => {
            data = [[ '1 b1 +', '1' ]]
            sheet = new Sheet(data);
        });

        it('evaluates 1 b1 + to 2', (done) => {
            parse('a1', data[0][0], [], sheet, (err, val) => {
                expect(err).to.be.null;
                expect(val).to.equal(2)
                done();
            });
        });
    });

    describe('solves A1 in the sample data set (which demonstrates multi cell dependency)', () => {
        beforeEach( () => {
            sheet = new Sheet(helper.sample);
        });

        it('evaluates b1 b2 + to -8', (done) => {
            parse('a1', helper.sample[0][0], [], sheet, (err, val) => {
                expect(err).to.be.null;
                expect(val).to.equal(-8)
                done();
            });
        });
    });

    describe('data conversions', () => {
        var data;
        beforeEach( () => {
            data = [[' ']];
            sheet = new Sheet(data);
        });

       it('converts empty space expressions to 0', (done) => {
           parse('a1', data[0][0], [], sheet, (err, val) => {
               expect(err).to.be.null;
               expect(val).to.equal(0);
               done();
           });
       });
    });

    describe('error conditions', () => {
        describe('it recognises circular dependencies and ERRs on them', () => {
            var data;
            beforeEach( () => {
                data = [[ '1 b1 +', 'a1' ]]
                sheet = new Sheet(data);
            });

            it('evaluates 1 b1 + to ERR', (done) => {
                parse('a1', data[0][0], [], sheet, (err, val) => {
                    expect(err).to.not.be.null;
                    done();
                });
            });
        });

        describe('it converts bad data to #ERR', () => {
            var data;
            beforeEach( () => {
                data = [[ '!', '+', '1 / 0', '1 2']]
                sheet = new Sheet(data);
            });

            it('evaluates ! to ERR', (done) => {
                parse('a1', data[0][0], [], sheet, (err, val) => {
                    expect(err).to.not.be.null;
                    done();
                });
            });

            it('evaluates + to ERR', (done) => {
                parse('c1', data[0][1], [], sheet, (err, val) => {
                    expect(err).to.not.be.null;
                    done();
                });
            });

            it('evaluates 1 / 0 to ERR', (done) => {
                parse('d1', data[0][2], [], sheet, (err, val) => {
                    expect(err).to.not.be.null;
                    done();
                });
            });

            it('evaluates 1 2 to ERR', (done) => {
                parse('d1', data[0][3], [], sheet, (err, val) => {
                    expect(err).to.not.be.null;
                    done();
                });
            });
        });
    });
});

