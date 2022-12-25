const { input } = require("./input.js");

function inOrder(left, right) {
  return compare(left, right) < 0;
};

function compare(left, right) {
  left = [left].flat();
  right = [right].flat();
  let i = 0;
  while (i < left.length && i < right.length) {
    if (Number.isInteger(left[i]) && Number.isInteger(right[i])) {
      if (left[i] == right[i]) {
        i++;
      } else {
        return left[i] - right[i];
      }
    } else {
      const recRes = compare([left[i]].flat(), [right[i]].flat());
      if (recRes == 0) {
        i++;
      } else {
        return recRes;
      }
    }
  }
  return left.length - right.length;
};



// PART 1
const indicesInOrder = [];
for (let i=0; i<input.length; i++) {
  const [input1, input2] = input[i];
  const r = inOrder(input1, input2);
  if (r) {
    indicesInOrder.push(i + 1);
  }
}
const result = indicesInOrder.reduce((a,b) => a + b, 0);



// PART 2
const dividers = [[[2]], [[6]]];
const pairs = input.flat(1);
pairs.push(...dividers);
let sorted = pairs.sort((a, b) => compare(a, b));
const result2 = dividers.map((pkg) => sorted.indexOf(pkg) + 1).reduce((a,b) => a*b, 1);



console.log("=== AdventOfCode 2022-day13 ===");
console.log("\npart_one:");
console.log(result);
console.log("\npart_two: ")
console.log(result2);
console.log("\n\n");