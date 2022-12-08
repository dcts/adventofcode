const { input } = require("./input.js");
const { Population } = require("./Population.js");

/**
 * ordering of the lanternfish does not matter,
 * there are only 8 states
 * 0,1,2,3,4,5,6,7,8
 */

const population = new Population(input);
population.runMultipleTimes(80);
const result1 = population.size();
population.runMultipleTimes(256 - 80);
const result2 = population.size();

console.log("=== AdventOfCode 2021-day6 ===");
console.log("\npart_one:");
console.log(result1); 
console.log("\npart_two: ")
console.log(result2);
console.log("\n\n");