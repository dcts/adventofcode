const fs = require("fs");
const path = require("path");

const inputRaw = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
  .toString()
  .trim()
  .split("\n");

const input = inputRaw.map(str => str.startsWith("noop") ? null : Number(str.split(" ")[1]));

module.exports = {
  input,
  inputRaw
}