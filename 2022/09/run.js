const { input } = require("./input.js");
const { Grid } = require("./Grid");

function makeMoves(grid, moves) {
  moves.forEach(move => {
    const {dir, n} = move;
    grid.moveMultiple(dir, Number(n));
  })
}

let grid = new Grid(2);
makeMoves(grid, input);
const result1 = grid.tailVisitedCount();

grid = new Grid(10);
makeMoves(grid, input);
const result2 = grid.tailVisitedCount();

console.log("=== AdventOfCode 2022-day09 ===");
console.log("\npart_one:");
console.log(result1);
console.log("\npart_two: ")
console.log(result2); 
console.log("\n\n");