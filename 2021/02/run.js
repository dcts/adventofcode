const { input } = require("./input.js");

// Part 1
let position = 0;
let depth = 0;
input.forEach(move => {
  const [dir, value] = move;
  if (dir === "forward") {
    position += value;
  } else if (dir === "down") {
    depth += value;
  } else if (dir === "up") {
    depth -= value;
  }
});
const result = position * depth;

// Part 2
position = 0;
depth = 0;
let aim = 0;
input.forEach(move => {
  const [dir, value] = move;
  if (dir === "forward") {
    position += value;
    depth += aim * value;
  } else if (dir === "down") {
    aim += value;
  } else if (dir === "up") {
    aim -= value;
  }
});
const result2 = position * depth;

console.log("=== AdventOfCode 2021-day2 ===");
console.log("\npart_one:");
console.log(result);
console.log("\npart_two: ")
console.log(result2);
console.log("\n\n");