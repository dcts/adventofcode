const year = "2021";
const day = "01";

const { input } = require(`./${year}/${day}/input.js`);

i2 = input.split("\n").map(line => {
  return line.split(",").map(numStr => Number(numStr));
  // const [rangeStr1, rangeStr2] = line.split(",").map(numStr => Number(numStr));
});