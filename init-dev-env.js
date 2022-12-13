const year = "2022";
const day = "12";

const { input } = require(`./${year}/${day}/input.js`);


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

function findValidNeighbors(grid, pos) {
  const [r, c] = pos;
  const currentChar = grid[r][c];
  const currentVal = char2num(currentChar);
  // find all valid neighbors in the grid
  const neighborPositions = findNeighborPositions(grid, pos);
  // filter by valid combinations
  return neighborPositions.filter(neighborPos => char2num(grid[neighborPos[0]][neighborPos[1]]) <= currentVal + 1);
}

const grid = input;
const [r, c] = findStart(grid);
const visited = initMatrix(grid.length, grid[0].length, false);
const firstElement = {
  pos: [r, c],
  depth: 0,
};
const queue = [firstElement];
let result = undefined;
let count = 0;
while (queue.length !== 0 && result === undefined) { // && count < 10) {
  count++;
  const {pos, depth} = queue.shift();
  const currentVal = grid[pos[0]][pos[1]];
  // console.log(`processing item with value ${currentVal} [${pos[0]} ${pos[1]}] - depth: ${depth}`);

  // mark visited
  visited[r][c] = true;

  // base case => end found
  if (currentVal === "E") {
    result = depth;
    break;
  }

  // find all neighbors that are not visited and a valid path
  findValidNeighbors(grid, pos).forEach(validNeighborPos => {
    if (!visited[validNeighborPos[0]][validNeighborPos[1]]) { // skip visited positions
      queue.push({
        pos: validNeighborPos,
        depth: depth+1,
      })
    }
  })
}
// console.log({result});
