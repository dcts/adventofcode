const { input } = require('./input');

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
function top3ElvesCalories(input) {
  const calories = input.map(elveInput => computeElveCalories(elveInput));
  return calories.sort((a,b) => b - a).slice(0, 3).reduce((a,b) => a + b, 0);
}

console.log("Run day1 algorithms...");
console.log("part_one: " + topElveCalories(input));
console.log("part_two: " + top3ElvesCalories(input));