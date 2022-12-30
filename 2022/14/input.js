const fs = require("fs");
const path = require("path");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map(line => {
    const points = line.split(" -> ").map(str => str.split(",").map(val => Number(val)));
    const pairs = [];
    for (let i=0; i<points.length-1; i++) {
      pairs.push([points[i], points[i+1]]);
    }
    return pairs;
  }).flat();

module.exports = {
  input
}