var expect = require('chai').expect,
    reader = require('./../../../../lib/csv/reader'),
    writer = require('./../../../../lib/csv/writer');

describe('writes a 2d array', () => {
    it('into csv', (done) => {
        var sample = [['1', '2 1 +']];
        writer('./test.csv', sample, (err, result) => {
            reader('test.csv', (err, data) => {
                expect(err).to.be.null;
                expect(data[0][0]).to.equal('1');
                expect(data[0][1]).to.match(/2 1 \+/);
                done();
            });
        });
    });
});
