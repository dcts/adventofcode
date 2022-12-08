const fs = require("fs");
const path = require("path");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map(line => line.split(" -> ").map(pointStr => pointStr.split(",").map(str => Number(str))))

module.exports = {
  input
}