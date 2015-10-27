/*
    Based on https://en.wikipedia.org/wiki/Reverse_Polish_notation#Postfix_algorithm
 */

const ERR = "ERR";
const VALUE = 0;
const OPERATOR = 1;
const REFERENCE = 2;
const OPERATORS = ['+', '-', '*', '/'];

module.exports = function(expression, dependencyPath, sheet, cb) {
    var tokens = expression.split(/\s/);
    var stack = [];

    var processor = (token) => {
        var tokenType = identifyToken(token);
        switch (tokenType) {
            case VALUE:
                stack.push(parseInt(token));
                break;
            case OPERATOR:
                console.log(stack)
                try {
                    val1 = stack.pop();
                    val2 = stack.pop();
                    console.log('!!!!!!')
                    stack.push(operate(token, val1, val2));
                    console.log('done: ', stack);
                }
                catch (err) {
                    return cb({ message: ERR }, null);
                }
                break;
            case REFERENCE:
//                console.log('token > ', token);
                dependencyPath.push(token);
                sheet.resolve(token, dependencyPath, (err, val) => {
                    if (err) {
                        return cb({ message: ERR }, null);
                    }
                        stack.push(val);
                    })
        }
    };

    tokens.forEach(processor);
    return cb(null, stack[0]);
};

function identifyToken(token) {
//    console.log(">>>> ", OPERATORS.indexOf(token.trim()), ' - ' , token)
    if (parseInt(token)) {
        return VALUE;
    }
    else if (OPERATORS.indexOf(token) >= 0) {
        return OPERATOR;
    }
    else {
        //ask the sheet to resolve all non values and non operators. It will either return an error or a value
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
        case '*':
            return val1 / val2;
    }
}

//var Parser = function(expression, sheet) {
//    this.tokens = expression.split(/\s/);
//    this.stack = [];
//};
//
//Parser.prototype.execute = function() {
//    this.token.forEach(  )
//    return 0;
//}
//
//Parser.prototype.evaluateToken = function(token) {
//    //1 if the token is a number, return it
//
//    //if the token is an operator, return it
//}
//
//module.exports = Parser;
