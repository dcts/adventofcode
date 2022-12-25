const fs = require("fs");
const path = require("path");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
  .toString()
  .split("\n\n")
  .map(pair => pair.split("\n").map(str => JSON.parse(str)));

module.exports = {
  input
}