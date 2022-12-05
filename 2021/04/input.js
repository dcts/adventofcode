const fs = require("fs");
const path = require("path");

const inputArr = fs
  .readFileSync(path.join(__dirname, "inputtest.txt"), "utf-8")
  .toString()
  .trim()
  .split("\n\n")

const input = {
  numbers: inputArr[0].split(",").map(str => Number(str)),
  boards: inputArr.slice(1),
}

module.exports = {
  input
}