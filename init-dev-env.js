const { Grid } = require("./2022/09/Grid");

const year = "2022";
const day = "09";

const { input } = require(`./${year}/${day}/input.js`);

const g = new Grid();

input.forEach(line => {
  const {dir, n} = line;
  g.moveMultiple(dir, Number(n));
})
const tailVisitedCount = g.tailVisitedCount();
console.log({tailVisitedCount})