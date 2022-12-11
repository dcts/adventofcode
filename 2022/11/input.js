const fs = require("fs");
const path = require("path");

function extractMonkeyId(monkeyStr) {
  return Number(monkeyStr.split("Monkey ")[1].split(":\n")[0]);
}
function extractItems(monkeyStr) {
  const itemsStr = monkeyStr.split("Starting items: ")[1].split("\n")[0]
  return itemsStr.split(",").map(numStr => Number(numStr.trim()));
}
function extractOperation(monkeyStr) {
  const func = monkeyStr.split("Operation: new = ")[1].split("\n")[0]
  return new Function("old", `return ${func}`);
}
function extractTest(monkeyStr) {
  const test = {
    divisibleBy: Number(monkeyStr.split("Test: divisible by ")[1].split("\n")[0]),
    ifTrue: Number(monkeyStr.split("If true: throw to monkey ")[1].split("\n")[0]),
    ifFalse: Number(monkeyStr.split("If false: throw to monkey ")[1].split("\n")[0]),
  }
  return test;
}
function extractMonkey(monkeyStr) {
  return {
    id: extractMonkeyId(monkeyStr),
    items: extractItems(monkeyStr),
    operation: extractOperation(monkeyStr),
    test: extractTest(monkeyStr),
  }
}

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
  .toString()
  .trim()
  .split("\n\n");

module.exports = {
  input,
  extractMonkey
}