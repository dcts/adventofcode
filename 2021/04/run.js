const { input } = require("./input.js");
const { Bingo, Board } = require("./Bingo.js"); 

// PART 1
const boards = input.boards.map(boardStr => new Board(boardStr));
const bingo = new Bingo(input.numbers, boards);
const result = bingo.run();

// PART 2
const boards2 = input.boards.map(boardStr => new Board(boardStr));
const bingo2 = new Bingo(input.numbers, boards2);
const result2 = bingo2.findLastWinner();

console.log("=== AdventOfCode 2021-day4 ===");
console.log("\npart_one:");
console.log(result);
console.log("\npart_two:");
console.log(result2);
console.log("\n\n");