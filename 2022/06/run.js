const { input } = require("./input.js");

function isUnique(string) {
  const n = string.length;
  const set = {};
  string.split("").forEach(char => set[char] = true);
  return Object.keys(set).length === n;
}

function run(input, offset) {
  for (let i=0+offset; i<input.length; i++) {
    const substr = input.slice(i-offset, i);
    if (isUnique(substr)) {
      return i;
    }
  }
  return null;
}

console.log("=== AdventOfCode 2022-day6 ==="); 
console.log("\npart_one:");
console.log(run(input, 4));
console.log("\npart_two: ")
console.log(run(input, 14));
console.log("\n\n");