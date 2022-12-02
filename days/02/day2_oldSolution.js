// A or X = Rock 
// B or Y = Paper
// C or Z = Scissors

// HELPER FUNCTION: get input from file
const fs = require("fs/promises");
async function getInput() {
  return await fs.readFile('/home/dcts/code/adventofcode/days/02/day2_input', { encoding: 'utf8' });
}

// HELPER FUNCTION: calculate a single game score
// gameScore = choiceScore + resultScore
// get resultScore
// return choiceScore + resultScore
function computeGameScore(opponentChoice, yourChoice) {
  const choiceScore = getChoiceScore(yourChoice);
  const resultScore = getResultScore(opponentChoice, yourChoice);
  return choiceScore + resultScore;
}

function getChoiceScore(choice) {
  return {
    "R": 1, // rock
    "P": 2, // paper
    "S": 3, // scissors
  }[choice];
}

function getResultScore(opponent, you) {
  if (opponent === you) {
    return 3; // draw
  }
  if (
    (opponent === "R" && you === "P") ||
    (opponent === "P" && you === "S") ||
    (opponent === "S" && you === "R")
  ) {
    return 6; // you win
  }
  // else you loose
  return 0;
}

// HELPER FUNCTION: transform encrypted choices for better readibility
function transformChoice(input) {
  if (input === "X" || input === "A") return "R";
  if (input === "Y" || input === "B") return "P";
  if (input === "Z" || input === "C") return "S";
  throw new Error(`Invalid Input. Allower: A,B,C,X,Y,Z. Got: ${input}`);
}

// HELPER FUNCTION: returns yourChoice, given the opponents choice and the required gameResult
// gameresults:
// X => loose
// Y => draw
// Z => win
function getTargetChoice(opponentChoice, targetGameResult) {
  if (targetGameResult === "X") { // loose
    return {
      "R": "S",
      "P": "R",
      "S": "P",
    }[opponentChoice];

  } else if (targetGameResult === "Y") { // draw
    return opponentChoice;

  } else if (targetGameResult === "Z") { // win
    return {
      "R": "P",
      "P": "S",
      "S": "R",
    }[opponentChoice];
  }
}

(async () => {
  // load input data
  const input = await getInput(); 
  const games = input.split("\n");

  // MAIN ALGORITHM Part 1
  // 1. load input data as string
  // 2. split by newline
  // 3. init total score
  // 4. iterate over games and add game score
  // 5. return totalScore
  console.log("Running algorithm part1...");
  let totalScore = 0;
  for (let i = 0; i < games.length; i++) { 
    const game = games[i];
    const [opponentChoice, yourChoice] = game.split(" ").map(choice => transformChoice(choice));
    totalScore += computeGameScore(opponentChoice, yourChoice);
  }
  console.log("TotalScore: " + totalScore);

  // MAIN ALGORITHM Part 2
  // 1. load input data as string
  // 2. split by newline
  // 3. init total score
  // 4. iterate over games
  //    => get targetChoice
  //    => calculate score and add to total score
  // 5. return totalScore
  console.log("\nRunning algorithm part1...");
  totalScore = 0;
  for (let i = 0; i < games.length; i++) { 
    const game = games[i];
    const gameInputs = game.split(" ");
    const opponentChoice = transformChoice(gameInputs[0]);
    const yourChoice = getTargetChoice(opponentChoice, gameInputs[1]);
    totalScore += computeGameScore(opponentChoice, yourChoice);
  }
  console.log("TotalScore: " + totalScore);
})();
