BIN=./node_modules/.bin

# Ensure all npm deps are present
install:
	npm install

test: install
	NODE_ENV=test ${BIN}/mocha
	@echo "Unit tests passed!";
