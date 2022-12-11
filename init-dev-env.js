const year = "2022";
const day = "08";

const { input } = require(`./${year}/${day}/input.js`);
const { Grid } = require(`./${year}/${day}/Grid.js`);

// matrixs
// greedy algorithm:
// 1: visible
// 0: hidden

// function initArray(n, value = 0) {
//   return Array(n).fill(value);
// } 
// function initMatrix(n, value = 0) {
//   const allZeros = Array(n).fill(value).map(() => initArray(n, value));
//   // first row and last row fully visible
//   allZeros[0] = initArray(n, 1);
//   allZeros[n-1] = initArray(n, 1);
//   // first col and last col fully visible
//   for (let i=0; i<n; i++) {
//     allZeros[i][0] = 1; // first column
//     allZeros[i][n-1] = 1; // last column
//   }
//   return allZeros;
// }

// function checkVisibility(matrix, dir) {
//   const resultMatrix = initMatrix(n);
//   if (dir === "LEFT") {
    
//   } else if (dir === "RIGHT") {
     
//   } else if (dir === "UP") {
     
//   } else if (dir === "DOWN") {

//   } else {
//     throw new Error(`Invalid dir. Got: ${dir}. Allowed: LEFT, RIGHT, UP, DOWN`);
//   }
// }




g = new Grid(input);

g.get
// matrix=g.matrix;
// row = 0;
// col = 0;
// dir = "RIGHT";


/**
 * 
 * 



 [ 3, 3, 5, 4, 9 ],
   1  1  2  1  0


 [ 3, 5, 4, 8, 9 ],
   1  2  1  1  0
 
 
 [ 3, 8, 4, 5, 9 ],
      2  1  1  0
*/