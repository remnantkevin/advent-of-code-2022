import { readFile } from "node:fs/promises";

const data = await readFile("day-02/data", { encoding: "utf8" });
const strategyEntries = data.split("\n").slice(0, -1);
const strategyPairs = strategyEntries.map((entry) => entry.split(" ") as [OpponentShapeLetter, MyShapeLetter]);

/*
  Part 1
*/

type OpponentShapeLetter = "A" | "B" | "C";
type MyShapeLetter = "X" | "Y" | "Z";
type MyOutcome = "lose" | "draw" | "win";

const MyShapeLetterPointMapping: Record<MyShapeLetter, number> = {
  X: 1,
  Y: 2,
  Z: 3,
};

const MyOutcomePointMapping: Record<MyOutcome, number> = {
  lose: 0,
  draw: 3,
  win: 6,
};

const MyOutcome: Record<OpponentShapeLetter, Record<MyShapeLetter, MyOutcome>> = {
  A: {
    X: "draw",
    Y: "win",
    Z: "lose",
  },
  B: {
    X: "lose",
    Y: "draw",
    Z: "win",
  },
  C: {
    X: "win",
    Y: "lose",
    Z: "draw",
  },
};

const myTotalScore = strategyPairs.reduce((total, [opponentLetter, myLetter]) => {
  const myOutcome = MyOutcome[opponentLetter][myLetter];

  const myOutcomeScore = MyOutcomePointMapping[myOutcome];
  const myShapeScore = MyShapeLetterPointMapping[myLetter];

  return total + myOutcomeScore + myShapeScore;
}, 0);

/*
  Part 2
*/

type HowRoundShouldEndLetter = "X" | "Y" | "Z";
type MyChoiceShapeLetter = "A" | "B" | "C";

const HowRoundShouldEndLetterMapping: Record<HowRoundShouldEndLetter, MyOutcome> = {
  X: "lose",
  Y: "draw",
  Z: "win",
};

const MyChoiceLetterPointMapping: Record<MyChoiceShapeLetter, number> = {
  A: 1,
  B: 2,
  C: 3,
};

const MyChoice: Record<OpponentShapeLetter, Record<MyOutcome, MyChoiceShapeLetter>> = {
  A: {
    draw: "A",
    win: "B",
    lose: "C",
  },
  B: {
    draw: "B",
    win: "C",
    lose: "A",
  },
  C: {
    draw: "C",
    win: "A",
    lose: "B",
  },
};

const myTotalScorePart2 = strategyPairs.reduce((total, [opponentLetter, howRoundShouldEndLetter]) => {
  const myOutcome = HowRoundShouldEndLetterMapping[howRoundShouldEndLetter];
  const myChoiceShapeLetter = MyChoice[opponentLetter][myOutcome];

  const myOutcomeScore = MyOutcomePointMapping[myOutcome];
  const myShapeScore = MyChoiceLetterPointMapping[myChoiceShapeLetter];

  return total + myOutcomeScore + myShapeScore;
}, 0);

/*
  Output
*/

console.log("===== Question 2 =====");
console.log("\n----- Part 1 -----");
console.log(myTotalScore);
console.log("\n----- Part 2 -----");
console.log(myTotalScorePart2);
console.log("\n===== End Question 2 =====\n");
