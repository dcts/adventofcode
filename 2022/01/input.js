const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n\n')
  .map(elveInput => elveInput.split("\n").map(caloriesStr => Number(caloriesStr)));

module.exports = {
	input, // array of arrays
         // => first dimenstion: elves
         // => second dimenstion: calories
};