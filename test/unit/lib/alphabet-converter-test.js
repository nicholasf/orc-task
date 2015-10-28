var expect = require('chai').expect,
    converter = require('./../../../lib/alphabet-converter');

describe('#arrayIndexToAlphabet', () => {
    it('converts a number to a single letter', () => {
        expect(converter.arrayIndexToAlphabet(0)).to.equal('a');
        expect(converter.arrayIndexToAlphabet(25)).to.equal('z');
    });

    it('converts a number to combinations of letters (for more than 26 columns)', ()=> {
        expect(converter.arrayIndexToAlphabet(26)).to.equal('aa');
        expect(converter.arrayIndexToAlphabet(51)).to.equal('az');
        expect(converter.arrayIndexToAlphabet(52)).to.equal('aaa');
        expect(converter.arrayIndexToAlphabet(53)).to.equal('aab');
        expect(converter.arrayIndexToAlphabet(76)).to.equal('aay');
        expect(converter.arrayIndexToAlphabet(77)).to.equal('aaz');
    });
});

describe('#alphabetToArrayIndex', () => {
    it('converts A to 0', () => {
       expect(converter.alphabetToArrayIndex('a')).to.equal(0);
    });

    it('converts Z to 25', () => {
        expect(converter.alphabetToArrayIndex('z')).to.equal(25);
    });

    it('converts AA to 26', () => {
        expect(converter.alphabetToArrayIndex('aa')).to.equal(26);
    });

    it('converts AZ to 51', () => {
        expect(converter.alphabetToArrayIndex('az')).to.equal(51);
    });

    it('converts AAZ to 77', () => {
        expect(converter.alphabetToArrayIndex('aaz')).to.equal(77);
    });
});

