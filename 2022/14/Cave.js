class Cave {
  constructor(rocks) {
    this.rocks = rocks; // input
    this.cave = undefined;
    this.xMin = undefined;
    this.xMax = undefined;
    this.yMin = undefined;
    this.yMax = undefined;
    this.initCave();
  }

  initCave() {
    // init dimensions
    this.xMin = Infinity;
    this.xMax = -Infinity;
    this.yMin = Infinity;
    this.yMax = -Infinity;
    
    // run through all points and get dimensions
    this.rocks.forEach(rock => {
      rock.forEach(point => {
        this.xMin = Math.min(this.xMin, point[0]);
        this.xMax = Math.max(this.xMax, point[0]);
        this.yMin = Math.min(this.yMin, point[1]);
        this.yMax = Math.max(this.yMax, point[1]);
      })
    })
    this.xSize = this.xMax - this.xMin;
    this.ySize = this.yMax;
    
    // init cave grid
    this.cave = new Array(this.ySize).fill(0).map(() => arrayFactory(this.xSize, "."));

    // add rocks
    this.rocks.forEach(points => this.addRock(points[0], points[1]));
  }

  addRock(start, end) { 
    const sameX = start[0] === end[0];
    const sameY = start[1] === end[1];
    let targetIndx = sameX ? 1 : sameY ? 0 : undefined;
    if (targetIndx === undefined) {
      throw new Error(`this should never happen: START_POINT=${start} END_POINT=${end} need to have at least 1 common dimension`);
    }
    const min = Math.min(start[targetIndx], end[targetIndx]);
    const max = Math.max(start[targetIndx], end[targetIndx]);
    for (let i=min; i<=max; i++) {
      let xIndx, yIndx;
      if (targetIndx === 1) {
        xIndx = this.indxTransformX(start[0]);
        yIndx = i;
      } else if (targetIndx === 0) {
        xIndx = this.indxTransformX(i);
        yIndx = start[1];
      } 
      console.log("");
      console.log({xMin: this.xMin, yMin: this.yMin});
      console.log({xIndx, yIndx});
      try {
        this.cave[xIndx][yIndx] = "#";
      } catch (err) {}
    }
  }

  indxTransformX(val) {
    return val - this.xMin;
  }
  
  indxTransformY(val) {
    return val - this.yMin;
  }

  print() {
    this.cave.forEach(row => {
      console.log(row.join(""));
    })
  }



  // // rocks = all lines of the input, where each line = 1 rock
  // addRocks() { 
  //   this.input.forEach(line => this.addRock(line));
  // }

  // // one rock is represented by a single line of input
  // // and consists of multiple rockParts
  // addRock(line) { 
  //   const points = line.split(" -> ").map(str => str.split(",").map(str => Number(str))); 
  //   for (let i = 0; i < points.length - 1; i++) {
  //     this.addRockPart(points[i], points[i+1]);
  //   }
  // }
  
  // // a rock part is defined by a start and endpoint
  // addRockPart(start, end) { 
  //   const sameX = start[0] === end[0];
  //   const sameY = start[1] === end[1];
  //   let targetIndx = sameX ? 1 : sameY ? 0 : undefined;
  //   if (targetIndx === undefined) {
  //     throw new Error(`this should never happen: START_POINT=${start} END_POINT=${end} need to have at least 1 common dimension`);
  //   }
  //   const min = Math.min(start[targetIndx], end[targetIndx]);
  //   const max = Math.max(start[targetIndx], end[targetIndx]);
  //   for (let i=min; i<=max; i++) {
  //     if (targetIndx === 1) {
  //       this.grid[start[0]][i] = "#";
  //     } else if (targetIndx === 0) {
  //       this.grid[i][start[1]] = "#";
  //     } 
  //   }
  // }
}

function arrayFactory(size, value) {
  return new Array(size).fill(0).map(() => value);
}

module.exports = {
  Cave
}