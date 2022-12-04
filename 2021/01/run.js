const { input } = require("./input.js");

// Part 1
let result = 0;
for (let i = 0; i <= input.length - 1; i++) {
  if (Number(input[i+1]) > Number(input[i])) {
    result += 1;
  }
}

// Part 2
let result2 = 0;
for (let i = 0; i <= input.length - 4; i++) {
  // no need to compute sums, as the only inputs that differ
  // are the first, and the forth input. 
  // Sencond and third input are always shared
  if (Number(input[i+3]) > Number(input[i])) {
    result2 += 1;
  }
}

console.log("=== AdventOfCode 2021-day1 ==="); // @todo insert day
console.log("\npart_one:");
console.log(result); 
console.log("\npart_two: ")
console.log(result2);
console.log("\n\n");