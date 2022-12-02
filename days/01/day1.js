// min of 50 star fruits needed by dec 25th
const fs = require("fs/promises");

// HELPER FUNCTION: get input from file
async function getInput() {
  return await fs.readFile('/home/dcts/code/adventofcode/days/01/day1_input', { encoding: 'utf8' });
}

// HELPER FUNCTION: compute calories for 1 elve helper
// 1. split by newline
// 2. transform to number
// // 3. reduce to count sum
function totalCalories(elveInput) {
  return elveInput.split("\n").reduce((a,b) => Number(a) + Number(b), 0);
}

// MAIN ALGORITHM
// 1. load input data as string
// 2. split by double newline
// 3. init max value (-Inf)
// 4. iterate over all elves and compute their individual
// 5. return max
(async () => {
  const input = await getInput(); 
  const elveInputs = input.split("\n\n"); 
  let max = -Infinity; 
  for (let i = 0; i < elveInputs.length; i++) { 
    const currentCalories = totalCalories(elveInputs[i]);
    max = Math.max(max, currentCalories);
  }
  console.log(`Maximum is: ${max}`); 
})();
