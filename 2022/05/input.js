const fs = require("fs");
const path = require("path");


function getInput() {
  const [stackStr, moveStr] = fs
    .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
    .toString()
    .split("\n\n");
  
  // extract moves to obeject with keys:
  // => n
  // => from
  // => to
  function extractMoves(moveStr) {
    const extractMove = (moveStr) => {
      return moveStr.replace(/[a-zA-Z]+/g, "").trim().split("  ").map(strValue => Number(strValue));
    }
    return moveStr.split("\n").map(lineStr => extractMove(lineStr));
  };
  
  // extract stacks to object with stackId as key, and array as value
  function extractStacks(stackStr) {
    const indxTransform = (indx) => {
      return 1 + (indx-1) * 4;
    }
    const getLoad = (loads, height, indx) => {
      const load = loads[height][indxTransform(indx)];
      if (load !== undefined && load !== " ") {
        return load;
      }
      return null;
    }
  
    const lines = stackStr.split("\n");
    const stacks = {}
    lines[lines.length-1].split("   ")
      .forEach(str => stacks[str.trim()] = []); // initialize stacks
  
    const loads = lines.slice(0, lines.length-1).reverse();
    Object.keys(stacks).forEach(stackId => {
      for (let height=0; height<loads.length; height++) {
        const load = getLoad(loads, height, stackId);
        if (load) {
          stacks[stackId].push(load);
        }
      }
    })
    return stacks;
  }
  
  return {
    stacks: extractStacks(stackStr),
    moves: extractMoves(moveStr)
  }
}

module.exports = {
  getInput
}