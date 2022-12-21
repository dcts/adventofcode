const { inputRaw, process } = require("./input.js");

// recursive function to calculate a nodes value
// uses depth first traversal
function calculate(node, tree) {
  if (node.value) { // base case
    return node.value;
  }

  // value needs resolution
  const valLeft = calculate(tree[node.left], tree);
  const valRight = calculate(tree[node.right], tree);
  return {
    "+": valLeft + valRight,
    "-": valLeft - valRight,
    "*": valLeft * valRight,
    "/": valLeft / valRight,
  }[node.operator];
}

// PART1
const input1 = process(inputRaw);
const result1 = calculate(input1.root, input1);

// PART2
const input2 = process(inputRaw);
// const result2 = 


console.log("=== AdventOfCode 2022-day21 ===");
console.log("\npart_one:");
console.log(result1);
console.log("\npart_two: ")
// console.log(result2); // @todo insert result part_two
console.log("\n\n");