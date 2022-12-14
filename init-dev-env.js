const year = "2022";
const day = "13";

const { input } = require(`./${year}/${day}/input.js`);

function compare(input1, input2) {
  console.log(`\nRunning compare()\nInput1: ${input1}\nInput2: ${input2}`);
  if (input1 === undefined) {
    console.log("true");
    return true; // left side ran out of elements, list is in order!
  }
  if (input2 === undefined) {
    console.log("false");
    return false; // right side ran out of elements, list is NOT in order!
  }

  // init flag
  let inOrder = true;

  // base case: both are numbers
  if (typeof(input1) === "number" && typeof(input2) === "number") {
    console.log(input1 <= input2);
    return input1 <= input2;
  }

  // adjust number to array
  if (typeof(input1) === "number") {
    input1 = [input1];
  }
  if (typeof(input2) === "number") {
    input2 = [input2];
  }

  // case2: 2 arrays
  const n = Math.max(input1.length, input2.length);
  for (let i=0; i<n; i++) {
    const isInOrder = compare((input1[i] || -Infinity), input2[i]);
    if (!isInOrder) {
      console.log("false");
      return false;
    }
  }

  // if all checks passed without flagging false, return true
  console.log("true");
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
  if (compare(input1, input2)) {
    indicesInOrder.push(i);
  }
}
const result = indicesInOrder.reduce((a,b) => a*b, 1);
console.log({result});


const cmp = (left, right) => {
  let i = 0;
  while (i < left.length && i < right.length) {
    if (Number.isInteger(left[i]) && Number.isInteger(right[i])) {
      if (left[i] == right[i]) {
        i++;
      } else {
        return left[i] - right[i];
      }
    } else {
      const recRes = cmp([left[i]].flat(), [right[i]].flat());
      if (recRes == 0) {
        i++;
      } else {
        return recRes;
      }
    }
  }
  return left.length - right.length;
};

const inOrder = (left, right) => {
  return cmp(left, right) < 0;
}

// /**
//  * returns true: if input1 > input2
//  */
// function isInOrder(input1, input2) {
//   input1 = makeArray(input1);
//   input2 = makeArray(input2);
//   return compareArrays(input1, input2);
// }

// function makeArray(input) {
//   return Array.isArray(input) ? input : [input];
// }

// /**
//  * compareArrays()
//  */
// function compareArrays(arr1, arr2) {
//   const maxLen = Math.max(arr1.length, arr2.length);
//   for (let i=0; i<maxLen; i++) {
//     const [el1, el2] = [arr1[i], arr2[i]];
//     if (el1 === undefined) {
//       return true;
//     }
//     if (el2 === undefined) {
//       return false;
//     }
//     if (el1 > el2) {
//       return false;
//     }
//   }
//   return true;
// }