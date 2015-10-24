const INITIAL = 0;
const UNEVALUATED = 0;
const EVALUATED = 0;
const ERR = 0;

module.exports = function(expression) {
    this.expression = expression;
    this.state = INITIAL;
    this.dependencies = [];
}