const algebra = require("algebra.js");
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

// returns a string of the needed operations
// to calculate the result
function nodeCalculation(node, tree) {
  if (node.value !== undefined) {
    return `${node.value}`;
  }
  let left = node.left;
  let right = node.right;
  if (isNaN(Number(left)) && left !== "humn") {
    left = nodeCalculation(tree[left], tree);
  } 
  if (isNaN(Number(right) && right !== "humn")) {
    right = nodeCalculation(tree[right], tree);
  }
  // left = eval(left) || left;
  // right = eval(right) || right;
  return `(${left}${node.operator}${right})`;
}

// PART1
let tree = process(inputRaw);
const result1 = calculate(tree.root, tree);

// PART2
tree = process(inputRaw);
const leftNode = tree[tree.root.left];
const rightNode = tree[tree.root.right];

const leftSideStr = nodeCalculation(leftNode, tree);
const rightSideStr = nodeCalculation(rightNode, tree);
const leftSide = algebra.parse(leftSideStr);
const rightSide = algebra.parse(rightSideStr);

const eq = new algebra.Equation(leftSide, rightSide);
const solution = eq.solveFor("humn");
const result2 = Math.round(eval(solution.toString())); 
// needs rounding because otherwise its a wrong solution.
// this is caused either by
// (a) the solution is actually technically wrong, because 0.1+0.2=0.300000004 
// (b) the package algebra.js has a bug, see: https://github.com/nicolewhite/algebra.js/issues/93

console.log("=== AdventOfCode 2022-day21 ===");
console.log("\npart_one:");
console.log(result1);
console.log("\npart_two: ")
console.log(result2);
console.log("\n\n");