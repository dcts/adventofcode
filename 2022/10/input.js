const fs = require("fs");
const path = require("path");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map(str => str.startsWith("noop") ? null : Number(str.split(" ")[1]));

module.exports = {
  input
}