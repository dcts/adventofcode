// UTILITY FUNCTION
// rotates a n x m matrix clockwise
// source => https://codereview.stackexchange.com/a/186833
function rotate(matrix) {
  let result = [];
  for(let i = 0; i < matrix[0].length; i++) {
    let row = matrix.map(e => e[i]).reverse();
    result.push(row);
  }
  return result;
};

// HELPER FUNCTION
// extracts moves from raw string data
// e.g.           "move 4 from 2 to 1"
// transforms to: {n: 4, from: 1, to: 0}
// note the decreasing of the index for easy access of stacks
function extractMoves(moveStr) {
  const extractMove = (moveStr) => {
    const [n, from, to] = moveStr.replace(/[a-zA-Z]+/g, "").trim().split("  ").map(strValue => Number(strValue));
    return {
      n: n, 
      from: from - 1,  // lower index by 1, to start at zero instead of 1!
      to: to - 1       // lower index by 1, to start at zero instead of 1!
    }; 
  }
  return moveStr.split("\n").map(lineStr => extractMove(lineStr));
};

// HELPER FUNCTION
// extracts stacks from raw string data
// output is an array of array of chars.
// each stack can be accessed by using index - 1
// e.g. to access stack 1 use stacks[1-1]
function extractStacks(stackStr) {
  const charMatrix = stackStr.split("\n").map(line => line.split(""));
  const rotated = rotate(charMatrix); // rotates matrix clockwise
  const stacksRaw = rotated.filter(line => /^\d/.test(line[0]));
  return stacksRaw
    .map(lineArr => lineArr.slice(1)) // remove stack identifier (stacks are named by increasing numbers)
    .map(lineArr => lineArr.filter(el => el !== " ")); // 
}

// HELPER FUNCTION
// extracts all data from input
// stacks + moves
function extractInput(input) {
  return [extractStacks(input.stackStr), extractMoves(input.moveStr)];
}

module.exports = {
  extractInput
}
