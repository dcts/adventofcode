const fs = require("fs");
const path = require("path");

function parseFile(str) {
  const [sizeStr, fileName] = str.split(" ");
  return {
    name: fileName,
    type: "file",
    size: Number(sizeStr),
  }
}
function parseDir(str) {
  return {
    name: str.split(" ")[1],
    type: "dir",
  }
}
function parseOutput(str) { // parse file or directory
  return str.startsWith("dir") ? parseDir(str) : parseFile(str);
}

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
  .toString()
  .trim()
  .split("$ ")
  .filter(val => val !== "")
  .map(val => val.trim())
  .map(command => {
    const cmd = command.split("\n")[0];
    const output = command.startsWith("cd") ? null : command.split("\n").slice(1).map(str => parseOutput(str));
    return {cmd, output}
  });

module.exports = {
  input
}