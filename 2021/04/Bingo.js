class Bingo {
  constructor(numbers, boards) {
    this.numbers = numbers;
    this.boards = boards;
  }

}

class Board {
  constructor(boardStr) {
    this.score = {
      x0: 0,
      x1: 0,
      x2: 0,
      x3: 0,
      x4: 0,
      y0: 0,
      y1: 0,
      y2: 0,
      y3: 0,
      y4: 0,
    };
  }
  hasWon() {
    return Object.values(this.score).some(score => score === 5); // won if at least 1 row or col is full
  }
}

module.exports {
  Bingo
}