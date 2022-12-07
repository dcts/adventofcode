class Bingo {
  constructor(numbers, boards) {
    this.numbers = numbers;
    this.boards = boards;
  }
  run() {
    for (let n=0; n<this.numbers.length; n++) {
      const number = this.numbers[n];
      for (let b=0; b<this.boards.length; b++) {
        const score = this.boards[b].play(number);
        if (score) {
          return score;
        }
      }
    }
  }

  findLastWinner() {
    let lastWinner = undefined;
    for (let n=0; n<this.numbers.length; n++) {
      const number = this.numbers[n];
      for (let b=0; b<this.boards.length; b++) {
        try {
          const score = this.boards[b].play(number);
          if (score) {
            lastWinner = score;
          }
        } catch(err) {
          // skipping error that you cannot play when already won
        }
      }
    }
    return lastWinner;
  }
}

class Board {
  static processBoardStr(boardStr) {
    const board = {};
    boardStr.split("\n").forEach((line, rowIndx) => {
      const lineProcessed = line.trim().split("  ").join(" ").split(" "); // trim and remove double spaces
      lineProcessed.forEach((numStr, colIndx)  => {
        board[Number(numStr)] = { col: colIndx, row: rowIndx };
      })
    })
    return board;
  }

  constructor(boardStr) {
    this.board = Board.processBoardStr(boardStr);
    this.score = {
      col0: 0,
      col1: 0,
      col2: 0,
      col3: 0,
      col4: 0,
      row0: 0,
      row1: 0,
      row2: 0,
      row3: 0,
      row4: 0,
    };
    this.finalScore = undefined;
    this.playedNums = {};
    this.lastPlayedNumber = undefined; // keep track of last number to compute win
  }

  // returns boolean
  hasWon() {
    return Object.values(this.score).some(score => score === 5); // won if at least 1 row or col is full
  }

  numAlreadyPlayed(num) {
    return this.playedNums[num] || false;
  }

  // returns finalScore if player wins
  // returns "undefined" otherwise
  play(num) {
    if (this.hasWon()) {
      throw new Error(`Cannot play, board already won with final score: ${this.finalScore}`);
    }
    if (this.numAlreadyPlayed(num)) {
      throw new Error(`Cannot play already played number ${num}`);
    }
    this.playedNums[num] = true;
    this.lastPlayedNumber = num;
    if (!this.board[num]) {
      return; // number not on baord, exit
    }
    const {col, row} = this.board[num];
    delete this.board[num];
    this.score[`col${col}`] += 1;
    this.score[`row${row}`] += 1;
    if (this.hasWon()) {
      return this.computeFinalScore();
    }
  }

  computeFinalScore() {
    if (!this.hasWon()) {
      throw new Error(`Board has not won, cannot call b.computeFinalScore()`);
    }
    const remainingNums = Object.keys(this.board).map(str => Number(str));
    const remainingNumsSum = remainingNums.reduce((a,b) => a+b, 0);
    this.finalScore = remainingNumsSum * this.lastPlayedNumber;
    return this.finalScore;
  }

  print() {
    let printBoard = Array.from(Array(5), () => new Array(5).fill("❌"));
    for (const [key, value] of Object.entries(this.board)) {
      const {col, row} = value;
      printBoard[row][col] = key.toString().padStart(2, " ");
    }
    console.log(printBoard.map(line => line.join(" ")).join("\n"));
  }
}

module.exports = {
  Bingo,
  Board
}