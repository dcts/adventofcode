class Grid {
  constructor(matrix) {
    if (matrix.length != matrix[0].length) {
      throw new Error(`Invalid grid. Only works for n x n matrix. Got: ${matrix.length} x ${matrix[0].length}`);
    }
    this.matrix = matrix;
    this.n = matrix.length;
  }
  get(row, col) {
    return this.matrix[row][col];
  }
  // returns count of how many spots
  // are hidden from all sides
  hiddenFromAllSidesCount() {
    const left = this.isHiddenFrom("LEFT"); // hidden from left matrix
    const right = this.isHiddenFrom("RIGHT"); // hidden from right matrix
    const top = this.isHiddenFrom("TOP"); // hidden from top matrix
    const bottom = this.isHiddenFrom("BOTTOM"); // hidden from bottom matrix
    let hiddenFromAllSidesCount = 0;
    for (let row=0; row<this.n; row++) {
      for (let col=0; col<this.n; col++) {
        const valuesMultiplied = left[row][col] * right[row][col] * top[row][col] * bottom[row][col];
        if (valuesMultiplied === 1) { 
          hiddenFromAllSidesCount++; // all values are 1 => current spot is hidden from all sides
        }
      }
    }
    return hiddenFromAllSidesCount;
  }

  // checks each position if its hidden from given direction
  // => dir => LEFT, RIGHT, TOP, BOTTOM
  // returns matrix with 0 or 1 for each position, where
  // => 1: position is hidden from given direction
  // => 0: position is visible from given direction
  isHiddenFrom(dir) {
    const n = this.n;
    const result = initMatrix(n, 1); // matrix initialized with value 1

    if (dir === "LEFT") { // iterate: row, col
      for (let row = 0; row < n; row ++) {
        let currentMax = -Infinity;
        for (let col = 0; col < n; col++) {
          currentMax = this.compareTreeHeights(row, col, currentMax, result);
        }
      }
      
    } else if (dir === "RIGHT") { // iterate: row, col_reversed
      for (let row = 0; row < n; row ++) {
        let currentMax = -Infinity;
        for (let col = n-1; col >= 0; col--) {
          currentMax = this.compareTreeHeights(row, col, currentMax, result);
        }
      }
      
    } else if (dir === "TOP") { // iterate: col, row
      for (let col = 0; col < n; col++) {
        let currentMax = -Infinity;
        for (let row = 0; row < n; row++) {
          currentMax = this.compareTreeHeights(row, col, currentMax, result);
        }
      }
      
    } else if (dir === "BOTTOM") { // iterate: col, row_reversed
      for (let col = 0; col < n; col++) {
        let currentMax = -Infinity;
        for (let row = n-1; row >= 0; row--) {
          currentMax = this.compareTreeHeights(row, col, currentMax, result);
        }
      }
    } else {
      throw new Error(`Invalid dir. Got: ${dir}. Allowed: LEFT,RIGHT,TOP,BOTTOM`)
    }
    return result;
  }

  compareTreeHeights(row, col, currentMax, result) {
    const treeHeight = this.get(row,col);
    if (treeHeight > currentMax) { // if maximum, position is visible! 
      result[row][col] = 0; // visible => 0
      currentMax = treeHeight; // set new max
    }
    return currentMax;
  }
  
  hasNeighbor(row, col, dir) {
    const offset = this.getPositionOffeset(dir);
    const rowNew = row + offset[0];
    const colNew = col + offset[1];
    const rowOutOfBounds = rowNew >= this.n || rowNew < 0;
    const colOutOfBounds = colNew >= this.n || colNew < 0;
    return !rowOutOfBounds && !colOutOfBounds
  }

  viewingDistance(row, col, dir) {
    const height = this.get(row, col);
    let visibleTrees = 0;
    let viewBlocked = false; // once a tree with same or higher height appears, the view is blocked!
    while (this.hasNeighbor(row, col, dir) && !viewBlocked) {
      visibleTrees++;
      const neighborCoordinates = this.getNeighborPosition(row, col, dir);
      const neighborHeight = this.get(...neighborCoordinates);
      if (neighborHeight >= height) {
        viewBlocked = true;
      }
      row = neighborCoordinates[0];
      col = neighborCoordinates[1];
    }
    return visibleTrees;
  }

  scenicScore(row, col) {
    return ["LEFT", "RIGHT", "TOP", "BOTTOM"]
      .map(dir => this.viewingDistance(row, col, dir))
      .reduce((a,b) => a * b, 1);
  }

  maxScenicScore() {
    let max = -Infinity;
    for (let row=0; row<this.n; row++) {
      for (let col=0; col<this.n; col++) {
        max = Math.max(max, this.scenicScore(row, col));
      }
    }
    return max;
  }

  getNeighborPosition(row, col, dir) {
    const [rowOffset, colOffset] = this.getPositionOffeset(dir);
    const r = row + rowOffset;
    const c = col + colOffset;
    if (this.matrix[r] !== undefined && this.matrix[r][c] !== undefined) { // ensure neighbor exists
      return [r, c];
    }
    throw new Error(`No neighbor for row:${row},col:${col}. This should never happen, please always call hasNeighbor() before calling getNeighborCoord().`);
  } 

  getPositionOffeset(dir) {
    return {
      "LEFT": [0, -1],
      "RIGHT": [0, 1],
      "TOP": [-1, 0],
      "BOTTOM": [1, 0],
    }[dir];
  }
}


/**
 * HELPER FUNCTIONS
 */
function initMatrix(n, value = 0) {
  return Array(n).fill(value).map(() => initArray(n, value));
}
function initArray(n, value = 0) {
  return Array(n).fill(value);
} 

module.exports = {
  Grid
}