// PART 1
const { getInput } = require("./input.js");

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
  const result = [];
  const n = Object.keys(stacks).length;
  for (let i=1; i<=n; i++) {
    result.push(stacks[i].pop());
  }
  return result.join("");
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
  const result = [];
  const n = Object.keys(stacks).length;
  for (let i=1; i<=n; i++) {
    result.push(stacks[i].pop());
  }
  return result.join("");
}



console.log("=== AdventOfCode 2022-day5 ===");
console.log("\npart_one:");
console.log(runPart1()); 
console.log("\npart_two: ")
console.log(runPart2()); 
console.log("\n\n");

