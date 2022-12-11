/**
 * FOREST is represented by a NxN matrix
 * each cell holds the height of the tree
 */
class Forest {
  constructor(trees) {
    if (trees.length != trees[0].length) {
      throw new Error(`Invalid forest. Only works for n x n trees input. Got: ${matrix.length} x ${matrix[0].length}`);
    }
    this.trees = trees;
    this.n = trees.length;
  }
  
  getTreeHeight(row, col) {
    return this.trees[row][col];
  }
  
  /**
   * PART 1
   */

  // hideScores is a matrix that counts for each tree 
  // from how many sides it is hidden, e.g.
  // 4 => tree hidden from all 4 sides (LEFT, RIGHT, TOP, BOTTOM)
  // 3 => tree hidden from 3 sides (not specifying which ones)
  // 2 => tree hidden from 2 sides (not specifying which ones)
  // 1 => tree hidden from 1 side (not specifying which one)
  // 0 => tree visible from all sides
  hideScores() {
    const left = this.hideMatrix("LEFT"); // hidden from left matrix
    const right = this.hideMatrix("RIGHT"); // hidden from right matrix
    const top = this.hideMatrix("TOP"); // hidden from top matrix
    const bottom = this.hideMatrix("BOTTOM"); // hidden from bottom matrix
    
    const hideScores = initMatrix(this.n, 0);
    for (let r=0; r<this.n; r++) {
      for (let c=0; c<this.n; c++) {
        hideScores[r][c] = left[r][c] + right[r][c] + top[r][c] + bottom[r][c];
      }
    }
    return hideScores;
  }

  // hideMatrix flags if the given tree is visible from
  // a given direction. If you want to compute visibility 
  // from all 4 sides you will need all 4 hideMatrices
  // => dir: LEFT, RIGHT, TOP, BOTTOM
  // the flag for each tree is either 0 or 1:
  // => 1: position is hidden from given direction
  // => 0: position is visible from given direction
  hideMatrix(dir) {
    const n = this.n;
    const hideMatrix = initMatrix(n, 1); // matrix initialized with value 1

    if (dir === "LEFT") { // iterate: row, col
      for (let row = 0; row < n; row ++) {
        let currentMax = -Infinity;
        for (let col = 0; col < n; col++) {
          currentMax = this._compareTreeHeights(row, col, currentMax, hideMatrix);
        }
      }
      
    } else if (dir === "RIGHT") { // iterate: row, col_reversed
      for (let row = 0; row < n; row ++) {
        let currentMax = -Infinity;
        for (let col = n-1; col >= 0; col--) {
          currentMax = this._compareTreeHeights(row, col, currentMax, hideMatrix);
        }
      }
      
    } else if (dir === "TOP") { // iterate: col, row
      for (let col = 0; col < n; col++) {
        let currentMax = -Infinity;
        for (let row = 0; row < n; row++) {
          currentMax = this._compareTreeHeights(row, col, currentMax, hideMatrix);
        }
      }
      
    } else if (dir === "BOTTOM") { // iterate: col, row_reversed
      for (let col = 0; col < n; col++) {
        let currentMax = -Infinity;
        for (let row = n-1; row >= 0; row--) {
          currentMax = this._compareTreeHeights(row, col, currentMax, hideMatrix);
        }
      }
    } else { // catch invalid dir
      throw new Error(`Invalid dir. Got: ${dir}. Allowed: LEFT,RIGHT,TOP,BOTTOM`)
    }

    return hideMatrix;
  }

  // compare current tree height with current max
  _compareTreeHeights(row, col, currentMax, hideMatrix) {
    const treeHeight = this.getTreeHeight(row,col);
    if (treeHeight > currentMax) { // if tree is higher than max, position is visible! 
      hideMatrix[row][col] = 0; // 0 = visible, 1 = hidden
      currentMax = treeHeight; // set new max
    }
    return currentMax; // keep track of max
  }

  /**
   * PART 2
   */
  
  // get matrix of scenic scores for each tree
  scenicScores() {
    const scenicScores = initMatrix(this.n, undefined);
    for (let row=0; row<this.n; row++) {
      for (let col=0; col<this.n; col++) {
        scenicScores[row][col] = this.scenicScore(row, col);
      }
    }
    return scenicScores;
  }

  // scenic score = multiply all viewingDistances
  // scenicScore = viewD(L) * viewD(R) * viewD(T) * viewD(B)
  scenicScore(row, col) {
    return ["LEFT", "RIGHT", "TOP", "BOTTOM"]
      .map(dir => this.viewingDistance(row, col, dir))
      .reduce((a,b) => a * b, 1);
  }

  // how far can you look from one tree in a given direction
  // once a tree has same or higher height, the view is blocked!
  viewingDistance(row, col, dir) {
    const height = this.getTreeHeight(row, col);
    let visibleTrees = 0;
    let viewBlocked = false; // once a tree with same or higher height appears, the view is blocked!
    while (this.hasNeighbor(row, col, dir) && !viewBlocked) {
      visibleTrees++;
      const [rowNew, colNew] = this.getNeighborPosition(row, col, dir);
      const neighborHeight = this.getTreeHeight(rowNew, colNew);
      if (neighborHeight >= height) {
        viewBlocked = true;
      }
      row = rowNew;
      col = colNew;
    }
    return visibleTrees;
  }

  // checks out of bounds for a given position
  hasNeighbor(row, col, dir) {
    const offset = this.getPositionOffeset(dir);
    const rowNew = row + offset[0];
    const colNew = col + offset[1];
    const rowOutOfBounds = rowNew >= this.n || rowNew < 0;
    const colOutOfBounds = colNew >= this.n || colNew < 0;
    return !rowOutOfBounds && !colOutOfBounds
  }

  // returns new coordinates
  getNeighborPosition(row, col, dir) {
    const [rowOffset, colOffset] = this.getPositionOffeset(dir);
    const rowNew = row + rowOffset;
    const colNew = col + colOffset;
    if (this.trees[rowNew] !== undefined && this.trees[rowNew][colNew] !== undefined) { // ensure neighbor exists
      return [rowNew, colNew];
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
  Forest
}