const year = "2022";
const day = "21";

const { input } = require(`./${year}/${day}/input.js`);

function computeValue(node, tree) {
  // base case
  if (node.value) {
    return node.value;
  }

  // else
  const valLeft = computeValue(tree[node.left], tree);
  const valRight = computeValue(tree[node.right], tree);
  return {
    "+": valLeft + valRight,
    "-": valLeft - valRight,
    "*": valLeft * valRight,
    "/": valLeft / valRight,
  }[node.operator];
}