var async = require('async'),
    constants = require('./../models/constants');

/*
    Based on https://en.wikipedia.org/wiki/Reverse_Polish_notation#Postfix_algorithm
 */

const VALUE = 0;
const OPERATOR = 1;
const REFERENCE = 2;
const OPERATORS = ['+', '-', '*', '/'];

module.exports = function(cellName, expression, dependencyPath, sheet, cb) {
    var tokens = expression.trim().split(/\s/);
    var stack = [];

    var processor = (token, cb) => {
        var tokenType = identifyToken(token);
        switch (tokenType) {
            case VALUE:
                stack.push(parseInt(token));
                cb();
                break;
            case OPERATOR:
                try {
                    val2 = stack.pop();
                    val1 = stack.pop();
                    stack.push(operate(token, val1, val2));
                    cb();
                }
                catch (err) {
                    return cb({ message: constants.ERR }, null);
                }
                break;
            case REFERENCE:
                if (dependencyPath.indexOf(token) >= 0) {
                    return cb({ message: constants.ERR }, null);
                }

                dependencyPath.push(cellName);
                sheet.resolve(token, dependencyPath, (err, val) => {
                    if (err) {
                        return cb({ message: constants.ERR }, null);
                    }

                    stack.push(val);
                    return cb();
                })
        }
    };

    async.each(tokens, processor, (err) => {
        if (err) {
            return cb(err, null)
        }

        return cb(null, stack[0]);
    })
};

function identifyToken(token) {
    if (parseInt(token)) {
        return VALUE;
    }
    else if (OPERATORS.indexOf(token) >= 0) {
        return OPERATOR;
    }
    else {
        return REFERENCE;
    }
}

function operate(operator, val1, val2) {
    switch (operator) {
        case '+':
            return val1 + val2;
        case '-':
            return val1 - val2;
        case '*':
            return val1 * val2;
        case '/':
            return val1 / val2;
    }
}
