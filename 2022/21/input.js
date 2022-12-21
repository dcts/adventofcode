const fs = require("fs");
const path = require("path");

const input = {};
fs.readFileSync(path.join(__dirname, "inputtest.txt"), "utf-8")
  .toString()
  .trim()
  .split("\n")
  .forEach(line => {
    const [left, right] = line.split(": ");
    if (!/\*|\+|\/|\-/.test(right)) {
      input[left] = {
        value: Number(right),
      }
    } else {
      const parts = right.split(" ");
      input[left] = {
        left: parts[0],
        operator: parts[1],
        right: parts[2],
      };
    }
  })

module.exports = {
  input
}