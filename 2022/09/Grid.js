class Grid {
  constructor() {
    this.headPos = [0,0];
    this.tailPos = [0,0];
    this.tailVisited = {
      "0,0": true,
    }
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
    this.maybeMoveTail(dir);
    // update visited tail
    this.updateVisited();
  }

  maybeMoveTail() {
    const tailOffsetRow = this.headPos[0] - this.tailPos[0];
    const tailOffsetCol = this.headPos[1] - this.tailPos[1];
    const diagonal = Math.abs(tailOffsetRow) > 0 && Math.abs(tailOffsetCol) > 0;
    const distance = Math.abs(tailOffsetCol) + Math.abs(tailOffsetRow);
    // move when 2 conditions are met:
    // a => diagonal and distance is 3 or bigger
    // b => non diagonal and distance is 2 or bigger
    const moveCondition = (!diagonal && distance >= 2) || (diagonal && distance >= 3);
    if (moveCondition) {
      this.tailPos[0] += capNumber(tailOffsetRow);
      this.tailPos[1] += capNumber(tailOffsetCol);
    }
  }
  

  moveHead(dir) { 
    const delta = {
      "R": [0, 1],
      "L": [0,-1],
      "U": [ 1, 0],
      "D": [-1, 0],
    }[dir];
    this.headPos[0] += delta[0];
    this.headPos[1] += delta[1];
  }

  updateVisited() {
    const tailPosStr = `${this.tailPos[0]},${this.tailPos[1]}`;
    this.tailVisited[tailPosStr] = true;
  }
}

function capNumber(num, min = -1, max = 1) {
  return Math.max(Math.min(num, max), min); // offset can be only -1, 0 or 1.
}

module.exports = {
  Grid
}



/**

.....    .....    .....
.....    ..H..    ..H..
..H.. -> ..... -> ..T..
.T...    .T...    .....
.....    .....    .....
rowOffset = 3 - 1 = 2 =NORMALIZE=> 1
colOffset = 2 - 1 = 1 =NORMALIZE=> 1


.....    .....    .....
.....    .....    .....
..H.. -> ...H. -> ..TH.
.T...    .T...    .....
.....    .....    .....
rowOffset = 2 - 1 = 1 =NORMALIZE=> 1
colOffset = 3 - 1 = 2 =NORMALIZE=> 1



.....    .....    .....
.....    .....    .....
..T.. -> ..T.. -> .....
.H...    .....    .T...
.....    .H...    .H...
rowOffset = 0 - 2 = -2 =NORMALIZE=> -1
colOffset = 1 - 2 = -1 =NORMALIZE=> -1


.....    .....    .....
.TH.. -> .T.H. -> ..TH.
.....    .....    .....
rowOffset = 0 - 0 = 0 =NORMALIZE=> 0
colOffset = 3 - 1 = 2 =NORMALIZE=> 1

...    ...    ...
.T.    .T.    ...
.H. -> ... -> .T.
...    .H.    .H.
...    ...    ...
rowOffset = 1 - 3 = -2 =NORMALIZE=> -1
colOffset = 1 - 1 =  0 =NORMALIZE=>  0


.....    .....    .....
.....    .....    .....
.H... -> .TH.. -> .TH..
.....    .....    .....
rowOffset = 1 - 1 = 0 =NORMALIZE=> 
colOffset = 2 - 1 = 1 =NORMALIZE=>
*/