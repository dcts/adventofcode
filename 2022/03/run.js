const { input } = require("./input.js");

// HELPER FUNCTION
// returns 2 arrays of strings containing items
// e.g. "abczuh" => [["a","b","c"],["z","u","h"]]
function splitRucksack(items) {
  return [
    items.slice(0, items.length / 2).split(""),
    items.slice(items.length / 2, items.length).split(""),
  ];
}

// HELPER FUNCTION: find same character in linear time
function findSameItem(items) {
  // split rucksack
  const [one, two] = splitRucksack(items);
  // create hashset for each compartment
  const [mapOne, mapTwo] = [{}, {}];
  one.forEach(item => mapOne[item] = true);
  two.forEach(item => mapTwo[item] = true);
  // find same item
  const itemMap = {};
  Object.keys(mapOne).forEach(item => itemMap[item] ? itemMap[item] += 1 : itemMap[item] = 1);
  Object.keys(mapTwo).forEach(item => itemMap[item] ? itemMap[item] -= 1 : itemMap[item] = -1);
  return Object.keys(itemMap).find(key => itemMap[key] === 0);
}

function getItemPriority(char) {
  if (char.toUpperCase() === char) { // uppercase
    return char.charCodeAt(0) - 38; // "A" is ASCII 65, but we need it to be 27: hence -38
  } else { // lowercase
    return char.charCodeAt(0) - 96; // "a" is ASCII 97, but we need it to be 1: hence -96
  }
}

// run computation part 1
const result = input
  .map(items => findSameItem(items))
  .map(sameItem => getItemPriority(sameItem))
  .reduce((a,b) => a+b, 0);
console.log(result);



/*
 * TESTS
 * comment back in to debug...
 */
// console.log("🧪 Running Tests...");
// console.log("🧪 testing findSameItem");
// console.log(findSameItem("vJrwpWtwJgWrhcsFMMfFFhFp") === "p"); 
// console.log(findSameItem("jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL") === "L"); 
// console.log(findSameItem("PmmdzqPrVvPwwTWBwg") === "P"); 
// console.log(findSameItem("wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn") === "v"); 
// console.log(findSameItem("ttgJtRGJQctTZtZT") === "t"); 
// console.log(findSameItem("CrZsJsPPZsGzwwsLwLmpwMDw") === "s"); 

// console.log("🧪 testing getItemPriority");
// console.log(getItemPriority("a") === 1);
// console.log(getItemPriority("z") === 26);
// console.log(getItemPriority("A") === 27);
// console.log(getItemPriority("Z") === 52);

// console.log("🧪 testing full example");
// console.log(`vJrwpWtwJgWrhcsFMMfFFhFp
// jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
// PmmdzqPrVvPwwTWBwg
// wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
// ttgJtRGJQctTZtZT
// CrZsJsPPZsGzwwsLwLmpwMDw`
//   .split("\n")
//   .map(items => findSameItem(items))
//   .map(sameItem => getItemPriority(sameItem))
//   .reduce((a,b) => a+b, 0) === 157);