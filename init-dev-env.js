const year = "2022";
const day = "13";

const { input } = require(`./${year}/${day}/input.js`);

function compare(input1, input2) {
  if (input1 === undefined) return true;
  if (input2 === undefined) return false;

  // base case: both are numbers
  if (typeof(input1) === "number" && typeof(input2) === "number") {
    return input1 <= input2;
  }

  // adjust number to array
  if (typeof(input1) === "number") return compare([input1], input2);
  if (typeof(input2) === "number") return compare(input1, [input2]);

  // 2 arrays:
  if (!Array.isArray(input1) || !Array.isArray(input2)) {
    throw new Error(`This should never happen. One input is not an array... \ninput1: ${input}\ninput2: ${input2}`);
  }
  
  // case2: 2 arrays
  const n = Math.max(input1.length, input2.length);
  for (let i=0; i<n; i++) {
    const res = compare(input1[i], input2[i]);
    if (res === true && input1[i] < input2[i]) {
      return true;
    } 
    if (res === true && input1[i] === input2[i]) {
      continue;
    }
    if (res === false) {
      return false;
    }
  }

  // if all checks passed without flagging false, return true
  return true;
}

// 🧪 UNIT TESTS
// console.log("");
// console.log("1.  true ", compare(1,2));
// console.log("2.  true ", compare([1],[2]));
// console.log("3.  true ", compare(2,2));
// console.log("4. false ", compare(3,2));
// console.log("5.  true ", compare([1,1,3,1,1],[1,1,5,1,1]));
// console.log("6.  true ", compare([1,1,5],[1,1,5,1,1]));
// console.log("7. false ", compare([1,1,5,1,1,1],[1,1,5,1,1]));
// console.log("8. false ", compare([1,[1,2],3], [1,1,1]));
// console.log("9. false ", compare([1,1,3], [1,[1,2],1]));
// console.log("10  true ", compare([1,1,1], [1,[1,2],1]));

// PART 1
const indicesInOrder = [];
for (let i=1; i<=input.length; i++) {
  const [input1, input2] = input[i-1];
  const res = compare(input1, input2);
  if (res) {
    indicesInOrder.push(i);
  }
}
const result = indicesInOrder.reduce((a,b) => a + b, 0);
console.log({result});
