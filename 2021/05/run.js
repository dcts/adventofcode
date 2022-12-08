const { input } = require("./input.js");

function countPoint(map, x, y) {
  const id = `${x}_${y}`;
  if (!map[id]) {
    map[id] = 0;
  }
  map[id] += 1;
}

function range(start, end) {
  if (start <= end) {
    const size = end - start + 1;
    return [...Array(size).keys()].map(i => i + start);
  }
  const size = start - end + 1;
  return [...Array(size).keys()].map(i => i + end).reverse();
}

function getPointsOnLine(p1, p2, countDiagonal = false) {
  const [x1, y1] = p1;
  const [x2, y2] = p2;
  if (x1 === x2) { // vertical line
    return range(y1, y2).map(y => [x1, y]);

  } else if (y1 === y2) { // horizontal line
    return range(x1, x2).map(x => [x, y1]);

  } else { // diagonal
    if (!countDiagonal) {
      return [];
    }
    const xRange = range(x1, x2);
    const yRange = range(y1, y2);
    return xRange.map((x, indx) => [x, yRange[indx]])
  }
}

// Main Algorithm
const map = {};
const map2 = {};
input.forEach((line) => {
  const [p1, p2] = line;
  // PART 1 
  getPointsOnLine(p1, p2, false).forEach(point => {
    countPoint(map, point[0], point[1]); 
  });
  // PART 2
  getPointsOnLine(p1, p2, true).forEach(point => {
    countPoint(map2, point[0], point[1]); 
  });
})
const result =  Object.values(map).filter(val => val >= 2).length;
const result2 =  Object.values(map2).filter(val => val >= 2).length;

console.log("=== AdventOfCode 2021-day5 ===");
console.log("\npart_one:");
console.log(result); 
console.log("\npart_two: ")
console.log(result2);
console.log("\n\n");