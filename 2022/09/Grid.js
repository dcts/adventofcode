class Grid {
  constructor(size = 2) { // max-size is 10 to properly grid.print()
    this.rope = new Array(size).fill(0).map(() => [0,0]);
    this.tailVisited = {
      "0,0": true,
    }
  }

  getHead() {
    return this.rope[0];
  }

  getTail() {
    return this.rope[this.rope.length - 1];
  }

  tailVisitedCount() {
    return Object.keys(this.tailVisited).length;
  }

  moveMultiple(dir, n) {
    for (let i=0; i<n; i++) {
      this.move(dir);
    }
  }

  move(dir) {
    // move head
    this.moveHead(dir);
    // maybe move tail
    this.moveTail();
    // update visited tail
    this.updateVisited();
  }

  moveTail() {
    for (let i=0; i<this.rope.length-1; i++) {
      this.moveSingleTail(i, i+1);
    }
  }

  moveSingleTail(prevIndx, nextIndx) {
    const prev = this.rope[prevIndx];
    const next = this.rope[nextIndx];
    const offsetRow = prev[0] - next[0];
    const offsetCol = prev[1] - next[1];
    const diagonal = Math.abs(offsetRow) > 0 && Math.abs(offsetCol) > 0;
    const distance = Math.abs(offsetCol) + Math.abs(offsetRow);
    // move when 2 conditions are met:
    // => diagonal and distance is 3 or bigger
    // => non diagonal and distance is 2 or bigger
    const moveCondition = (!diagonal && distance >= 2) || (diagonal && distance >= 3);
    if (moveCondition) {
      this.rope[nextIndx][0] += capNumber(offsetRow);
      this.rope[nextIndx][1] += capNumber(offsetCol);
    }
  }

  moveHead(dir) { 
    const delta = {
      "R": [0, 1],
      "L": [0,-1],
      "U": [ 1, 0],
      "D": [-1, 0],
    }[dir];
    this.rope[0][0] += delta[0];
    this.rope[0][1] += delta[1];
  }

  updateVisited() {
    const [tailRow, tailCol] = this.getTail();
    const positionStr = `${tailRow},${tailCol}`;
    this.tailVisited[positionStr] = true;
  }
}

function capNumber(num, min = -1, max = 1) {
  return Math.max(Math.min(num, max), min); // offset can be only -1, 0 or 1.
}

module.exports = {
  Grid
}



/**
==================================================
EXPLENATION OF MOVE CONDITION
==================================================
=> case1: MOVE IF diagonal && distance >= 3
.....    .....    .....
.....    ..H..    ..H..
..H.. -> ..... -> ..T..
.T...    .T...    .....
.....    .....    .....
offsetRow = 3 - 1 = 2 capNumber=> 1
offsetCol = 2 - 1 = 1 capNumber=> 1
distance          = 3 (MOVE)

.....    .....    .....
.....    .....    .....
..H.. -> ...H. -> ..TH.
.T...    .T...    .....
.....    .....    .....
offsetRow = 2 - 1 = 1 capNumber=> 1
offsetCol = 3 - 1 = 2 capNumber=> 1
distance          = 3 (MOVE)

.....    .....    .....
.....    .....    .....
..T.. -> ..T.. -> .....
.H...    .....    .T...
.....    .H...    .H...
offsetRow = 0 - 2 = -2 capNumber=> -1
offsetCol = 1 - 2 = -1 capNumber=> -1
distance          =  3 (MOVE)

.....    .....    .....
.....    .....    .....
.HT.. -> ..T.. -> ..T..
.....    .H...    .H...
offsetRow = 0 - 1 = -1
offsetCol = 1 - 2 = -1
distance          =  2 (DON'T MOVE because < 3)


==================================================
=> case2: MOVE IF non-diagonal && distance >= 2
.....    .....    .....
.TH.. -> .T.H. -> ..TH.
.....    .....    .....
offsetRow = 0 - 0 = 0 capNumber=> 0
offsetCol = 3 - 1 = 2 capNumber=> 1
distance          = 2 (MOVE)

...    ...    ...
.T.    .T.    ...
.H. -> ... -> .T.
...    .H.    .H.
...    ...    ...
offsetRow = 1 - 3 = -2 capNumber=> -1
offsetCol = 1 - 1 =  0 capNumber=>  0
distance          =  2 (MOVE)

.....    .....    .....
.....    .....    .....
.H... -> .TH.. -> .TH..
.....    .....    .....
offsetRow = 1 - 1 = 0
offsetCol = 2 - 1 = 1
distance          = 1 (DON'T MOVE because < 2)
*/