const { input } = require("./input.js");
const { Tree } = require(`./Tree.js`);

const root = new Tree("/");
let currentNode = root;

// MY APPROACH TO SOLVE THIS:
// (0) parse input into array of actions. 
//     each action can be either "cd UP/DOWN" or "ls"
// (1) first build a tree that represents the file 
//     system (see Tree.js)
// (2) then run a DFT (depth first traversal)
//     and compute the totalSize of each directory
//     recursively
// (3) once you have a list of all directories
//     with the representive totalSize solving both
//     parts becomes trivial

// (1) build the tree structure first
input.slice(1).forEach(action => {
  const {cmd, output} = action;

  if (cmd === "cd ..") {
    currentNode = currentNode.parent;
    
  } else if (cmd.startsWith("cd")) {
    const targetDir = cmd.split(" ")[1];
    currentNode = currentNode.children[targetDir];
    
  } else if (cmd === "ls") {
    currentNode.addElements(output);

  } else {
    throw new Error(`Invalid action found. Got: ${cmd}`);
  }
})

// (2) DepthFirst Travesal to compute totalSize
// for all directories recursively
// totalSize = totalSize of childDirectories + node fileSizes
function dft(node, result) {
  let childSizes = 0;
  for (const [_, childNode] of Object.entries(node.children)) {
    childSizes += dft(childNode, result);
  }
  const totalSize = node.size + childSizes;
  result.push({dir: node.fullPath(), size: totalSize});
  return totalSize;
}
const directories = []; // all directories
const occupied = dft(root, directories); // occupiedSpace

// PART 1
const result = directories
  .filter(dir => dir.size < 100000) // filter dir with target size
  .map(dir => dir.size)  // array of sizes
  .reduce((a,b) => a + b); // sum of all sizes

// PART 2
const total = 70000000;
const needed = 30000000;
const availible = total - occupied;
const minSizeToDelete = needed - availible;
const candidates = directories
  .filter(dir => dir.size >= minSizeToDelete) // filter out too small directories
  .map(dir => dir.size) // array of sizes that fit criteria
const deleteDirWithSize = Math.min(...candidates);

console.log("=== AdventOfCode 2022-day7 ===");
console.log("\npart_one:");
console.log(result);
console.log("\npart_two: ")
console.log(deleteDirWithSize); // @todo insert result part_two
console.log("\n\n");