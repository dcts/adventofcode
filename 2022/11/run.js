const { input, extractMonkey } = require("./input.js");

const { Monkey } = require(`./Monkey.js`);
const { Game } = require(`./Game.js`);
const { calculateLCM } = require(`./Utils.js`);

let monkeys, game;

// PART 1
monkeys = input.map(str => extractMonkey(str)).map(obj => new Monkey(obj.id, obj.items, obj.operation, obj.test));
game = new Game(monkeys);
game.playMultipleRounds(20);
const result = game.monkeyBusiness();

// PART 2
monkeys = input.map(str => extractMonkey(str)).map(obj => new Monkey(obj.id, obj.items, obj.operation, obj.test));
const commonModulo = calculateLCM(monkeys.map(m => m.test.divisibleBy));
game = new Game(monkeys, commonModulo);
game.playMultipleRounds(10000);
const result2 = game.monkeyBusiness();

console.log("=== AdventOfCode 2022-day11 ==="); 
console.log("\npart_one:");
console.log(result); 
console.log("\npart_two: ")
console.log(result2);
console.log("\n\n");