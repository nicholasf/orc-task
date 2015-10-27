var expect = require('chai').expect,
    converter = require('./../../../lib/alphabet-converter');

describe('#arrayIndexToAlphabet', () => {
    it('converts a number to a single letter', () => {
        expect(converter.arrayIndexToAlphabet(0)).to.equal('A');
        expect(converter.arrayIndexToAlphabet(25)).to.equal('Z');
    });

    it('converts a number to combinations of letters (for more than 26 columns)', ()=> {
        expect(converter.arrayIndexToAlphabet(26)).to.equal('AA');
        expect(converter.arrayIndexToAlphabet(51)).to.equal('AZ');
        expect(converter.arrayIndexToAlphabet(52)).to.equal('AAA');
        expect(converter.arrayIndexToAlphabet(53)).to.equal('AAB');
        expect(converter.arrayIndexToAlphabet(76)).to.equal('AAY');
        expect(converter.arrayIndexToAlphabet(77)).to.equal('AAZ');
    });
});