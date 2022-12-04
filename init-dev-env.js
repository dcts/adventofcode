const day = "04";

const { input } = require(`./2022/${day}/input.js`);

i2 = input.split("\n").map(line => {
  return line.split(",").map(numStr => Number(numStr));
  // const [rangeStr1, rangeStr2] = line.split(",").map(numStr => Number(numStr));
});