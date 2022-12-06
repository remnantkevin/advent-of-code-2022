import { readFile } from "node:fs/promises";
import { splitEachAt } from "../../utils";

const data = await readFile("day-04/data", { encoding: "utf8" });
const entries = data.split("\n").slice(0, -1);

/*
  Part 1
*/

/**
 *    a-b,x-y
 * -> a-b contains x-y if: a <= x and y <= b
 * -> x-y contains a-b if: x <= a and b <= y
 */
function isContained([sectionAssignment1, sectionAssignment2]: number[][]): boolean {
  return (
    (sectionAssignment1[0] <= sectionAssignment2[0] && sectionAssignment2[1] <= sectionAssignment1[1]) ||
    (sectionAssignment2[0] <= sectionAssignment1[0] && sectionAssignment1[1] <= sectionAssignment2[1])
  );
}

const containedRangesCount = splitEachAt(entries, ",")
  .map((entries) => splitEachAt(entries, "-"))
  .map((entry) => entry.map((sectionAssignmentArr) => sectionAssignmentArr.map((section) => Number.parseInt(section))))
  .filter(isContained).length;

/*
  Part 2
*/

/**
 *    a-b,x-y
 * -> a-b overlaps x-y if: a <= x <= b, or, a-b contains x-y
 * -> x-y overlaps a-b if: x <= a <= y, or, x-y contains a-b
 */
function isOverlap([sectionAssignment1, sectionAssignment2]: number[][]): boolean {
  return (
    (sectionAssignment2[0] <= sectionAssignment1[0] && sectionAssignment1[0] <= sectionAssignment2[1]) ||
    (sectionAssignment2[0] <= sectionAssignment1[1] && sectionAssignment1[1] <= sectionAssignment2[1]) ||
    isContained([sectionAssignment1, sectionAssignment2])
  );
}

const overlappingRangesCount = splitEachAt(entries, ",")
  .map((entries) => splitEachAt(entries, "-"))
  .map((entry) => entry.map((sectionAssignmentArr) => sectionAssignmentArr.map((section) => Number.parseInt(section))))
  .filter(isOverlap).length;

/*
  Output
*/

console.log("===== Question 04 =====");
console.log("\n----- Part 1 -----");
console.log(containedRangesCount);
console.log("\n----- Part 2 -----");
console.log(overlappingRangesCount);
console.log("\n===== End Question 04 =====\n");
