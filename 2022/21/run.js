const { inputRaw, process } = require("./input.js");

// recursive function to calculate a nodes value
// uses depth first traversal
function calculate(node, tree) {
  if (node.value !== undefined) { // base case
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

// computes difference between left and right side
// given a value for humn
function compareSides(tree, humnValue) {
  tree.humn = { value: humnValue };
  const leftTree = tree[tree.root.left];
  const rightTree = tree[tree.root.right];
  const l = calculate(leftTree, tree);
  const r = calculate(rightTree, tree);
  return l - r;
}

// PART1
const input1 = process(inputRaw);
const result1 = calculate(input1.root, input1);
console.log({result1});

// PART2
// BRUTE FOrCE APProACH Not WORKING...!
// const input2 = process(inputRaw);
// let target = 0;
// let tempRes = compareSides(input2, target);
// while(tempRes > 0) {
//   target += 1000;
//   tempRes = compareSides(input2, target);
// }
// const result2 = target;
// console.log({result2});
// const result2 = 


console.log("=== AdventOfCode 2022-day21 ===");
console.log("\npart_one:");
console.log(result1);
console.log("\npart_two: ")
// console.log(result2); // @todo insert result part_two
console.log("\n\n");