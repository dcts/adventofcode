const { input } = require("./input.js");
const { extractInput } = require("./utils");

function showTopOfStacks(stacks) {
  return stacks.map(arr => arr[arr.length - 1]).join("");
}

// PART 1
function runPart1(input) {
  const [stacks, moves] = extractInput(input);
  moves.forEach(move => {
    const {n, from, to} = move;
    for (let i=0; i<n; i++) {
      const element = stacks[from].pop();
      if (element) {
        stacks[to].push(element);
      }
    }
  })
  return showTopOfStacks(stacks);
}

// PART 2
function runPart2(input) {
  const [stacks, moves] = extractInput(input);
  moves.forEach(move => {
    const {n, from, to} = move;
    const elements = [];
    for (let i=0; i<n; i++) {
      const element = stacks[from].pop();
      if (element) {
        elements.unshift(element);
      }
    }
    stacks[to] = stacks[to].concat(elements);
  })
  return showTopOfStacks(stacks);
}

console.log("=== AdventOfCode 2022-day5 ===");
console.log("\npart_one:");
console.log(runPart1(input)); 
console.log("\npart_two: ")
console.log(runPart2(input)); 
console.log("\n\n");

