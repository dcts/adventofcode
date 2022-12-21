const fs = require("fs");
const path = require("path");

const inputRaw = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8")
  .toString()
  .trim();
  
function process(inputRaw) {
  const input = {};
  inputRaw.split("\n").forEach(line => {
    const [left, right] = line.split(": ");
    if (!/\*|\+|\/|\-/.test(right)) { // base case
      input[left] = {
        value: Number(right),
      }
    } else { // nested case
      const parts = right.split(" ");
      input[left] = {
        left: parts[0],
        operator: parts[1],
        right: parts[2],
      };
    }
  })
  return input;
}

module.exports = {
  inputRaw,
  process,
}