const { input } = require("./input.js");

function findPositions(grid, chars) {
  const positions = [];
  for (let r=0; r<grid.length; r++) {
    for (let c=0; c<grid[0].length; c++) {
      if (chars.includes(grid[r][c])) {
        positions.push([r, c]);
      }
    }
  }
  if (positions.length === 0) {
    throw new Error(`No positions with chars ${chars} found!`);
  }
  return positions;
}

function initMatrix(rows, cols, value) {
  return Array(rows).fill(0).map(() => Array(cols).fill(value));
}

/**
 * findNeighborPositions()
 * -> finds all neighbor positions 
 * -> filters out "out-of-bounds" positions 
 * 🧪 UNIT TESTS 
 * findNeighborPositions(grid, [0,0]) // => [0,1],[1,0]✅  
 * findNeighborPositions(grid, [2,4]) // => [3,4],[1,4],[2,3],[2,5]✅  
 * findNeighborPositions(grid, [3,7]) // => [2,7],[4,7],[3,6]✅   
 */
function findNeighborPositions(grid, pos) {
  const rows = grid.length;
  const cols = grid[0].length;
  const neighborPositions = [];
  [
    [0,1],
    [0,-1],
    [1,0],
    [-1,0],
  ].forEach(offset => {
    const [rowOffset,colOffset] = offset;
    const newRow = pos[0] + rowOffset;
    const newCol = pos[1] + colOffset;
    const rowInBounds = newRow >= 0 && newRow < rows;
    const colInBounds = newCol >= 0 && newCol < cols;
    if (rowInBounds && colInBounds) {
      neighborPositions.push([newRow, newCol]);
    }
  })
  return neighborPositions;
}

function char2num(char) {
  char = char === "S" ? "a" : char === "E" ? "z" : char;
  return char.charCodeAt(0) - 96;
}

/**
 * findValidNeighbors()
 * -> first gets all neighbors (filter out "out-of-bounds" positions) 
 * -> then checks if step is valid or prohibited  
 *    a -> b (valid)  
 *    a -> c (invalid)  
 * 🧪 UNIT TESTS  
 * findValidNeighbors(grid, [0,0]) // => [0,1],[1,0] ✅  
 * findValidNeighbors(grid, [2,4]) // => [2,5] ✅   
 * findValidNeighbors(grid, [3,7]) // => [2,7] ✅  
 */
function findValidNeighbors(grid, pos) {
  const currentChar = grid[pos[0]][pos[1]];
  const currentVal = char2num(currentChar);
  // find all valid neighbors in the grid
  const neighborPositions = findNeighborPositions(grid, pos);
  // filter by valid combinations
  return neighborPositions.filter(neighborPos => {
    const neighborChar = grid[neighborPos[0]][neighborPos[1]];
    const neighborVal = char2num(neighborChar);
    return neighborVal <= currentVal + 1;
  });
}

/**
 * BFS: traverse graph in a breadth first traversal
 * keep track of the deepth
 * once the end is reached, the depth is the shortest path
 * returns count of steps
 */
function shortestPath(grid, startingPos) {
  const visited = initMatrix(grid.length, grid[0].length, false);
  const firstElement = {
    pos: startingPos,
    depth: 0,
  };
  const queue = [firstElement];
  let result = undefined;
  while (queue.length !== 0) {
    const {pos, depth} = queue.shift(); // take item out of queue
    if (visited[pos[0]][pos[1]]) { // exit if already visited node!
      continue;
    }
    const currentVal = grid[pos[0]][pos[1]];

    // mark visited
    visited[pos[0]][pos[1]] = true;

    // base case => end found
    if (currentVal === "E") {
      result = depth;
      break;
    }

    // find all neighbors that are not visited and a valid path
    findValidNeighbors(grid, pos).forEach(validNeighborPos => {
      const [neighborRow, neighborCol] = validNeighborPos;
      const neighborNotVisited = !visited[neighborRow][neighborCol];
      if (neighborNotVisited) { // skip visited positions
        queue.push({
          pos: validNeighborPos,
          depth: depth + 1,
        })
      }
    })
  }
  return result;
}

// INITIALIZE GRID
const grid = input;

// PART 1
const startingPosition = findPositions(grid, ["S"])[0]; // only 1 position labeled "S"
const result = shortestPath(grid, startingPosition);

// PART 2
// brute force apporach, not efficient.
const startingPositions = findPositions(grid, ["S", "a"]);
let result2 = Infinity;
startingPositions.forEach(startingPosition => {
  const result = shortestPath(grid, startingPosition);
  if (result) { // filter out undefineds
    result2 = Math.min(result2, result);
  }
})

console.log("=== AdventOfCode 2022-day12 ===");
console.log("\npart_one:");
console.log(result);
console.log("\npart_two: ")
console.log(result2);
console.log("\n\n");

// better (more efficient) algorithm for part2 would be:
//   1. find all starting positions
//   2. sort starting positions by distance to END
//   3. iterate over starting positions
//   4. keep track of the trail (array with positions that lead to end)
//   5. create hashmap for each position with the shortestPath (count) 
//      from each position on the grid
//   6. save all trail positions shortest path by iterating and decreasing
//      the result by 1 each step.
//   7. add a check for each queueElement to see if you know already
//      the shortest path from the current position, if yes, no need 
//      to run again
