const { Forest } = require("./Forest.js");
const { input } = require("./input.js");

// PART 1
const forest = new Forest(input);
const hideScores = forest.hideScores();
const visibleTrees = hideScores
  .map(row => row.filter(score => score < 4).length) // find nbr of visible trees per row
  .reduce((a,b) => a + b, 0); // sum nbr of visible trees per row to get total

// PART 2
function findMax(matrix) {
  return Math.max(...matrix.map(row => Math.max(...row)));
}
const scenicScores = forest.scenicScores();
const maxScenicScore = findMax(scenicScores); 

console.log("=== AdventOfCode 2022-day8 ==="); 
console.log("\npart_one:");
console.log(visibleTrees);
console.log("\npart_two: ");
console.log(maxScenicScore);
console.log("\n\n");
