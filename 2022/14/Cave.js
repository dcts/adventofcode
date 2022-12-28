class Cave {
  constructor() {
    this.xDim = [undefined, undefined];
    this.yDim = [undefined, undefined];
    this.grid = [[]];
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
    const minX = undefined;
    const maxX = undefined;
    const minY = undefined;
    const maxY = undefined;
    lines.forEach(line => {
      const parts = line.split(" -> ").map(pointStr => pointStr.split(",").map(strNum => Number(strNum)));
      parts.forEach(p => {
        minX = Math.min(minX, p[0]);
        maxX = Math.max(maxX, p[0]);
        minY = Math.min(minY, p[1]);
        maxY = Math.max(maxY, p[1]);
      })
    })
    this.xDim = [minX, maxX];
    this.yDim = [minY, maxY];
  }
}

module.exports = {
  Cave
}