const year = "2022";
const day = "12";

const { input } = require(`./${year}/${day}/input.js`);
const { Queue } = require(`./${year}/${day}/Queue.js`);

function findStart(grid) {
  for (let r=0; r<grid.length; r++) {
    for (let c=0; c<grid[0].length; c++) {
      if (grid[r][c] === "S") {
        return [r, c];
      }
    }
  }
  throw new Error("Start not found");
}

function initMatrix(rows, cols, value) {
  return Array(rows).fill(0).map(() => Array(cols).fill(value));
}

// 🧪 TESTING
// ✅ findNeighborPositions(grid, [0,0]) // => [0,1],[1,0]
// ✅ findNeighborPositions(grid, [2,4]) // => [3,4],[1,4],[2,3],[2,5]
// ✅ findNeighborPositions(grid, [3,7]) // => [2,7],[4,7],[3,6]
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

// 🧪 TESTING
// ✅ findValidNeighbors(grid, [0,0]) // => [0,1],[1,0]
// ✅ findValidNeighbors(grid, [2,4]) // => [2,5]
// ✅ findValidNeighbors(grid, [3,7]) // => [2,7]
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

const grid = input;
const [r, c] = findStart(grid);
const visited = initMatrix(grid.length, grid[0].length, false);
const firstElement = {
  pos: [r, c],
  depth: 0,
};
const queue = new Queue();
queue.enqueue(firstElement);
let result = undefined;
while (queue.length !== 0) {
  const {pos, depth} = queue.dequeue(); // take item out of queue
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
      queue.enqueue({
        pos: validNeighborPos,
        depth: depth+1,
      })
    }
  })
}

console.log({result});
