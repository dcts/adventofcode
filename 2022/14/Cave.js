class Cave {
  constructor(rocks) {
    this.rocks = rocks; // input
    this.cave = undefined;
    this.col = {
      min: undefined,
      max: undefined,
      size: undefined,
    }
    this.row = {
      min: undefined,
      max: undefined,
      size: undefined,
    }
    this.initCave();
  }

  initCave() {
    // init dimensions
    this.col.min = Infinity;
    this.col.max = -Infinity;
    this.row.min = Infinity;
    this.row.max = -Infinity;
    
    // run through all points and get dimensions
    this.rocks.forEach(rock => {
      rock.forEach(point => {
        this.col.min = Math.min(this.col.min, point[0]);
        this.col.max = Math.max(this.col.max, point[0]);
        this.row.min = Math.min(this.row.min, point[1]);
        this.row.max = Math.max(this.row.max, point[1]);
      })
    })
    this.col.size = this.col.max - this.col.min + 1;
    this.row.size = this.row.max + 1;
    
    // init cave grid
    const [xSize, ySize] = [this.col.size, this.row.size];
    this.cave = new Array(ySize).fill(0).map(() => arrayFactory(xSize, "."));

    // add rocks
    this.rocks.forEach(points => this.addRock(points[0], points[1]));

    // add starting position
    this.set(0, 500, "+");
  }

  addRock(start, end) { 
    const sameCol = start[0] === end[0];
    const sameRow = start[1] === end[1];
    let targetIndx = sameRow ? 0 : sameCol ? 1 : undefined;
    if (targetIndx === undefined) {
      throw new Error(`this should never happen: START_POINT=${start} END_POINT=${end} need to have at least 1 common dimension`);
    }
    const min = Math.min(start[targetIndx], end[targetIndx]);
    const max = Math.max(start[targetIndx], end[targetIndx]);
    for (let i=min; i<=max; i++) {
      let colIndx, rowIndx;
      if (targetIndx === 1) { // sameCol
        colIndx = start[0];
        rowIndx = i;
      } else if (targetIndx === 0) { // sameRow
        colIndx = i;
        rowIndx = start[1];
      } 
      this.set(rowIndx, colIndx, "#");
    }
  }

  set(rowIndx, colIndx, value) {
    this.cave[rowIndx][this.indxTransformCol(colIndx)] = value;
  }

  indxTransformCol(val) {
    return val - this.col.min;
  }
  
  print() {
    console.log("");
    this.cave.forEach(row => {
      console.log(row.join(""));
    })
  }

  canFall(current) {
    const nextDown = this.next(current, "D");
    const nextDownLeft = this.next(current, "DL");
    const nextDownRight = this.next(current, "DR");
  }

  pourSand() {
    let current = [0, 500];
    let stop = !this.canFall(current);
    while(!stop) {
      current = this.fall(current);
    }
  }

  next(current, dir) {
    const offset = {
      "D": [1, 0], // down
      "DL": [1, -1], // down-left
      "DR": [1, 1], // down-right
    }[dir];
    const nextPosition = [
      current[0] + offset[0],
      current[1] + offset[1],
    ]
    if (this.isValid(nextPosition)) {
      return nextPosition;
    }
    return undefined;
  }

  // checks if position is in bounds of the cave
  // return true or false
  inBounds(position) {
    const [row, col] = position;
  }
}

function arrayFactory(size, value) {
  return new Array(size).fill(0).map(() => value);
}

module.exports = {
  Cave
}