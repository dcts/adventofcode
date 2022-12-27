const fs = require("fs");
const path = require("path");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map(line => {
    const [dir, n] = line.split(" "); 
    return {
      dir: dir,
      n: Number(n)
    };
  });

module.exports = {
  input
}