const { getInput } = require("./input.js");

function showTopOfStacks(stacks) {
  const topOfStacks = [];
  const n = Object.keys(stacks).length;
  for (let i=1; i<=n; i++) {
    topOfStacks.push(stacks[i].pop());
  }
  return topOfStacks.join("");
}

// PART 1
function runPart1() {
  const {stacks, moves} = getInput();

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
function runPart2() {
  const {stacks, moves} = getInput();

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
console.log(runPart1()); 
console.log("\npart_two: ")
console.log(runPart2()); 
console.log("\n\n");

