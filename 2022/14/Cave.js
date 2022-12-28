class Cave {
  constructor() {
    this.xMin = Infinity;
    this.xMax = -Infinity;
    this.yMin = Infinity;
    this.yMax = -Infinity;
    this.cave = [[]];
  }

  addRock(line) {
    const parts = line.split(" -> ");
    for (let i=0; i<parts.length-1; i++) {
      const start = parts[i].split(",").map(val => Number(val));
      const end = parts[i+1].split(",").map(val => Number(val));
      if (start[0] === end[0]) {
        const min = Math.min(start[1], end[1]);
        const max = Math.max(start[1], end[1]);
        for (let i=min; i<=max; i++) {
          this.grid[start[0]][i] = "#";
        }

      } else if (start[1] === end[1]) {
        const min = Math.min(start[0], end[0]);
        const max = Math.max(start[0], end[0]);
        for (let i=min; i<=max; i++) {
          this.grid[i][start[1]] = "#";
        }

      } else {
        throw new Error(`this should never happen: START=${start} END=${end}`);
      }
    }
  }

  addRocks(lines) {
    lines.forEach(line => this.addRock(line));
  }

  initCave(lines) {
    lines.forEach(line => {
      const parts = line.split(" -> ").map(pointStr => pointStr.split(",").map(strNum => Number(strNum)));
      console.log({parts});
      parts.forEach(p => {
        this.xMin = Math.min(this.xMin, p[0]);
        this.xMax = Math.max(this.xMax, p[0]);
        this.yMin = Math.min(this.yMin, p[1]);
        this.yMax = Math.max(this.yMax, p[1]);
      })
    })
    this.xSize = this.xMax - this.xMin;
    this.ySize = this.yMax - this.yMin;
    this.cave = new Array(ySize);
  }
}

function arrayFactory(size, value) {
  return new Array(size).fill(0).map(() => value);
}

module.exports = {
  Cave
}