import { readFile } from "node:fs/promises";

const data = await readFile("day-01/data", { encoding: "utf8" });

/*
  Part 1
*/

const part1Answer = data
  .split("\n\n")
  .map((calorieEntriesString) => calorieEntriesString.split("\n"))
  .map((calorieEntriesStringArray) => calorieEntriesStringArray.map(Number))
  .map((calorieArray) => calorieArray.reduce((total, curr) => total + curr))
  .reduce((most, curr) => (curr > most ? curr : most));

/*
  Part 2
*/

const calorieSumsSorted = data
  .split("\n\n")
  .map((calorieEntriesString) => calorieEntriesString.split("\n"))
  .map((calorieEntriesStringArray) => calorieEntriesStringArray.map(Number))
  .map((calorieArray) => calorieArray.reduce((total, curr) => total + curr))
  .sort((a, b) => b - a);

/*
  Output
*/

console.log("===== Question 1 =====");
console.log("\n----- Part 1 -----");
console.log(part1Answer);
console.log("\n----- Part 2 -----");
console.log(
  `${calorieSumsSorted[0]} + ${calorieSumsSorted[1]} + ${calorieSumsSorted[2]}`
);
console.log(
  `= ${calorieSumsSorted[0] + calorieSumsSorted[1] + calorieSumsSorted[2]}`
);
console.log("\n===== End Question 1 =====\n");
