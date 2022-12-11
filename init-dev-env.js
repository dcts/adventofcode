const year = "2022";
const day = "11";

const { input, extractMonkey } = require(`./${year}/${day}/input.js`);

const { Monkey } = require(`./${year}/${day}/Monkey.js`);
const { Game } = require(`./${year}/${day}/Game.js`);
const { calculateLCM } = require(`./${year}/${day}/Utils.js`);

let monkeys, game, monkeyBusiness;

// PART 1
monkeys = input.map(str => extractMonkey(str)).map(obj => new Monkey(obj.id, obj.items, obj.operation, obj.test));
game = new Game(monkeys);
game.playMultipleRounds(20);
const monkeyBusinessPart1 = game.monkeyBusiness();
console.log({monkeyBusinessPart1});

// PART 2
monkeys = input.map(str => extractMonkey(str)).map(obj => new Monkey(obj.id, obj.items, obj.operation, obj.test));
const commonModulo = calculateLCM(monkeys.map(m => m.test.divisibleBy));
game = new Game(monkeys, commonModulo);
game.playMultipleRounds(10000);
const monkeyBusinessPart2 = game.monkeyBusiness();
console.log({monkeyBusinessPart2});

// 14416201800 => WRONG

