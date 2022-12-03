const { input } = require("./input.js");

// LOOKUP choiceScores
// rock = 1
// paper = 2
// scissors = 3
// 
// LOOKUP resultScores
// loose = 0
// draw = 3
// win = 6

const GAME_SCORE_LOOKUP = { // resultScore + choiceScore
  "A X": 1 + 3, // (rock, rock)
  "B X": 1 + 0, // (paper, rock)
  "C X": 1 + 6, // (scissors, rock)
  "A Y": 2 + 6, // (rock, paper)
  "B Y": 2 + 3, // (paper, paper)
  "C Y": 2 + 0, // (scissors, paper)
  "A Z": 3 + 0, // (rock, scissors)
  "B Z": 3 + 6, // (paper, scissors)
  "C Z": 3 + 3, // (scissors, scissors)
};

const GAME_SCORE_LOOKUP_2 = { // choiceScore + resultScore
  "A X": 0 + 3, // (rock, scissors) => loose
  "B X": 0 + 1, // (paper, rock) => loose
  "C X": 0 + 2, // (scissors, paper) => loose
  "A Y": 3 + 1, // (rock, rock) => draw
  "B Y": 3 + 2, // (paper, paper) => draw
  "C Y": 3 + 3, // (scissors, scissors) => draw
  "A Z": 6 + 2, // (rock, paper) => win
  "B Z": 6 + 3, // (paper, scissors) => win
  "C Z": 6 + 1, // (scissors, rock) => win
};

function totalGameScores(input, game_score_lookup) {
  return input
    .map(gameStr => game_score_lookup[gameStr])
    .reduce((a,b) => a + b, 0);
}


console.log("=== AdventOfCode 2022-day2 ===");
console.log("\npart_one: total score:")
console.log(totalGameScores(input, GAME_SCORE_LOOKUP));
console.log("\npart_two: total score:")
console.log(totalGameScores(input, GAME_SCORE_LOOKUP_2));
console.log("\n\n");