// HELPER FUNCTION: get input from file
const fs = require("fs/promises");
async function getInput() {
  return await fs.readFile('/home/dcts/code/adventofcode/days/02/day2_input', { encoding: 'utf8' });
}

// LOOKUP choiceScores
// rock = 1
// paper = 2
// scissors = 3
// 
// LOOKUP resultScores
// loose = 0
// draw = 3
// win = 6

// PART 1: hardcoded
// choiceScore + resultScore
function getGameScore(gameStr) {
  return { 
    "A X": 1 + 3, // (rock, rock)
    "B X": 1 + 0, // (paper, rock)
    "C X": 1 + 6, // (scissors, rock)
    "A Y": 2 + 6, // (rock, paper)
    "B Y": 2 + 3, // (paper, paper)
    "C Y": 2 + 0, // (scissors, paper)
    "A Z": 3 + 0, // (rock, scissors)
    "B Z": 3 + 6, // (paper, scissors)
    "C Z": 3 + 3, // (scissors, scissors)
  }[gameStr];
}

// PART 2: hardcoded
// resultScore + choiceScore
function getGameScorePart2(gameStr) {
  return { 
    "A X": 0 + 3, // (rock, scissors) => loose
    "B X": 0 + 1, // (paper, rock) => loose
    "C X": 0 + 2, // (scissors, paper) => loose
    "A Y": 3 + 1, // (rock, rock) => draw
    "B Y": 3 + 2, // (paper, paper) => draw
    "C Y": 3 + 3, // (scissors, scissors) => draw
    "A Z": 6 + 2, // (rock, paper) => win
    "B Z": 6 + 3, // (paper, scissors) => win
    "C Z": 6 + 1, // (scissors, rock) => win
  }[gameStr];
}

(async () => {
  // load input data
  const input = await getInput(); 
  const games = input.split("\n");

  // MAIN ALGORITHM Part 1 + 2
  // 1. init total score
  // 2. iterate over games and add game score
  // 3. return totalScore
  let totalScore = 0;
  let totalScorePart2 = 0;
  for (let i = 0; i < games.length; i++) { 
    totalScore += getGameScore(games[i]);
    totalScorePart2 += getGameScorePart2(games[i]);
  }
  console.log("TotalScore: " + totalScore);
  console.log("TotalScorePart2: " + totalScorePart2);
})();
