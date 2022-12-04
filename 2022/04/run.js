const { input } = require("./input.js"); 

// transform input (array of lines) into
// array of array of arrays of numbers, e.g;
// [
//   [ [ 51, 88 ], [ 52, 87 ] ],
//   [ [ 41, 55 ], [ 22, 56 ] ],
//   [ [ 6, 74 ], [ 74, 86 ] ],
//   [ [ 51, 88 ], [ 52, 87 ] ]
// ]
const transformedLines = input.map(line => {
  return line.split(",").map(range => {
    return range.split("-").map(numStr => Number(numStr))
  })
});

// PART1
let result = 0;
transformedLines.forEach(([range1, range2]) => {
  const range1containing = range1[0] >= range2[0] && range1[1] <= range2[1];
  const range2containing = range2[0] >= range1[0] && range2[1] <= range1[1];
  if (range1containing || range2containing) {
    result += 1;
  }
});

// PART2  
let result2 = 0;
transformedLines.forEach(([range1, range2]) => {
  const range1valid = range1[1] < range2[0];
  const range2valid = range2[1] < range1[0];
  if (!range1valid && !range2valid) {
    result2 += 1;
  }
});

console.log("=== AdventOfCode 2022-day4 ==="); 
console.log("\npart_one:");
console.log(result); 
console.log("\npart_two: ")
console.log(result2); 
console.log("\n\n");