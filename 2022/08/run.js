const { Grid } = require("./Grid.js");
const { input } = require("./input.js");

const grid = new Grid(input);
const totalSpots = grid.n * grid.n;
const hiddenFromAllSidesCount = grid.hiddenFromAllSidesCount();
const result = totalSpots - hiddenFromAllSidesCount;

const result2 = grid.maxScenicScore();

console.log("=== AdventOfCode 2022-day8 ==="); 
console.log("\npart_one:");
console.log(result);
console.log("\npart_two: ");
console.log(result2);
console.log("\n\n");
