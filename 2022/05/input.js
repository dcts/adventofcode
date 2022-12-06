const fs = require("fs");
const path = require("path");

const [stackStr, moveStr] = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
  .toString()
  .split("\n\n");

const input = {
  stackStr: stackStr,
  moveStr: moveStr
}

module.exports = {
  input
}