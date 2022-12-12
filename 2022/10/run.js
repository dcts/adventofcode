const { input } = require("./input.js");

// PART 1

// the following is a timeline of cycles (left) 
// with the registerX values (right) at the START
// of each cycle.

// NR: OPERATION              = RegisterX at START
//  0: placeholder            = null 
//  1: 1                      =  1
//  2: 1                      =  1
//  3: 1+15                   = 16
//  4: 1+15                   = 16
//  5: 1+15-11                =  5
//  6: 1+15-11                =  5
//  7: 1+15-11+6              = 11
//  8: 1+15-11+6              = 11
//  9: 1+15-11+6-3            =  8
// 10: 1+15-11+6-3            =  8
// 11: 1+15-11+6-3+5          = 13
// 12: 1+15-11+6-3+5          = 13
// 13: 1+15-11+6-3+5-1        = 12
// 14: 1+15-11+6-3+5-1        = 12
// 15: 1+15-11+6-3+5-1-8      =  4
// 16: 1+15-11+6-3+5-1-8      =  4
// 17: 1+15-11+6-3+5-1-8+13   = 17
// 18: 1+15-11+6-3+5-1-8+13   = 17
// 19: 1+15-11+6-3+5-1-8+13+4 = 21
// 20: 1+15-11+6-3+5-1-8+13+4 = 21

// generate the above timeline array, then you can simply 
// get the registerX value at the start of a given cycle 
// by calling: timeline[cycle]

const startsWithNoop = input[0] === null;

// if starts with noop, only 1 cycle is needed to prepend
// (null is a placeholder to omit zero index)
const startValuesWithNoop = [null, 1];

// it starts with addx, 2 cycles needed to prepend
// (null is a placeholder to omit zero index)
const startValuesWithAddx = [null, 1, 1];

const startValues = startsWithNoop ? startValuesWithNoop : startValuesWithAddx;
const registerChanges = input.map(val => val === null ? null : [val, 0]).flat();
const timeline = startValues.concat(registerChanges);

let registerX = 1;
for (let i=3; i<timeline.length; i++) {
  const add = timeline[i] || 0;
  registerX += add;
  timeline[i] = registerX;
}
const result = [20, 60, 100, 140, 180, 220].map(cycle => timeline[cycle] * cycle).reduce((a,b) => a+b, 0);


console.log("=== AdventOfCode 2022-day10 ===");
console.log("\npart_one:");
console.log(result);
console.log("\npart_two: ")
// console.log(result2); // @todo insert result part_two
console.log("\n\n");