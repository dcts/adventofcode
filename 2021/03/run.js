const { input } = require("./input.js");

// taken from here
// https://www.w3resource.com/javascript-exercises/javascript-math-exercise-2.php
function bin2dec(bstr) { 
  return parseInt((bstr + '').replace(/[^01]/gi, ''), 2);
}

// PART 1
let gamma = [];
let epsilon = [];
for (let i=0; i<input[0].length; i++) {
  let count0 = 0;
  let count1 = 0;
  for (let j=0; j<input.length; j++) {
    if (input[j][i] === "0") {
      count0 += 1;
    } else {
      count1 += 1;
    }
  }
  gamma.push(count0 > count1 ? "0" : "1");
  epsilon.push(count0 > count1 ? "1" : "0");
}
const gammaDec = bin2dec(gamma.join(""));
const epsilonDec = bin2dec(epsilon.join(""));
const result = gammaDec * epsilonDec;

// PART 2
function findRating(input, type) {
  let population = input;
  for (let i=0; i<input[0].length; i++) {
    let zeroPop = [];
    let onePop = [];
    for (let j=0; j<population.length; j++) {
      if (population[j][i] === "0") {
        zeroPop.push(population[j]);
      } else {
        onePop.push(population[j]);
      }
    }
    // assign new population
    if (type === "oxygen") {
      population = zeroPop.length > onePop.length ? zeroPop : onePop;
    } else if (type === "CO2") {
      population = zeroPop.length > onePop.length ? onePop : zeroPop;
    }
    if (population.length === 1) {
      break;
    }
  }
  return population[0];
}

const oxygenRating = bin2dec(findRating(input, "oxygen").join(""));
const co2Rating = bin2dec(findRating(input, "CO2").join(""));
const result2 = oxygenRating * co2Rating;

console.log("=== AdventOfCode 2022-day??? ==="); // @todo insert day
console.log("\npart_one:");
console.log(result); // @todo insert result part_one
console.log("\npart_two: ")
console.log(result2); // @todo insert result part_two
console.log("\n\n");