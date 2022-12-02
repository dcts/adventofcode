const path = require('path');
const fs = require('fs');

const input = fs
  .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
  .toString()
  .trim()
  .split('\n');

module.exports = {
	input, // array of gameStrings. Example: 
         // [
         //   "A X",
         //   "A Z",
         // ]
};