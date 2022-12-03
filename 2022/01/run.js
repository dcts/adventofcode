const { input } = require('./input.js');

// HELPER FUNCTION: compute calories for 1 elve
function computeElveCalories(elveInput) {
  return elveInput.reduce((a,b) => a + b, 0);
}

// PART 1
function topElveCalories(input) {
  let max = -Infinity; 
  for (let i = 0; i < input.length; i++) { 
    const currentCalories = computeElveCalories(input[i]);
    max = Math.max(max, currentCalories);
  }
  return max;
}

// PART 2
function topThreeElvesCalories(input) {
  const n = 3;
  const calories = input.map(elveInput => computeElveCalories(elveInput));
  return calories.sort((a,b) => b - a).slice(0, n).reduce((a,b) => a + b, 0);
}

console.log("=== AdventOfCode 2022-day1 ===");
console.log("\npart_one: Top Elve calories:")
console.log(topElveCalories(input));
console.log("\npart_two: Top 3 Elves calories:")
console.log(topThreeElvesCalories(input));
console.log("\n\n");