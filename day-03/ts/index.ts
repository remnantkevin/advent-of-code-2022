import { readFile } from "node:fs/promises";

const LowercaseACharCode = 97 as const;

/*
GbccTtTSGGbgrcWBGGrdgT nVQnCmNpCJlNnNPVfClcnN => c => 3
vMzvZhzhwDL VmQnClwwNQp => w => 23
FRsZFzjQFsqRzRRjDZ bdtTgdHBBWGrdBdHHs => s => 19
HCLTmbCLg zNBNPSSlT => T => 46
==> 3 + 23 + 19 + 46 = 91
*/
function getPriority(letter: string): number {
  const charCode = letter.charCodeAt(0);
  const priority = charCode >= LowercaseACharCode ? charCode - 96 : charCode - 38;
  return priority;
}

const data = await readFile("day-03/data", { encoding: "utf8" });
const rucksackItemLists = data.split("\n").slice(0, -1);

/*
  Part 1
*/

const repeatedItems = rucksackItemLists.map((itemList) => {
  // const uniqueItemNames = [...new Set(itemList)];

  const itemListArray = [...itemList];
  const left = itemListArray.slice(0, itemList.length / 2);
  const right = itemListArray.slice(itemList.length / 2);

  const duplicateItemName = left.find((itemName) => right.includes(itemName)) ?? "";

  return duplicateItemName;
});

const prioritySumPart1 = repeatedItems.reduce((sum, item) => sum + getPriority(item), 0);

/*
  Part 2
*/

const itemListsPerGroup = rucksackItemLists.reduce((grouped, itemList, currIndex) => {
  if (currIndex % 3 === 2) {
    return [...grouped, [rucksackItemLists[currIndex - 2], rucksackItemLists[currIndex - 1], itemList]];
  } else {
    return grouped;
  }
}, [] as string[][]);

const prioritySumPart2 = itemListsPerGroup.reduce((sum, [firstList, secondList, thirdList]) => {
  const firstListArray = [...firstList];
  const duplicateItemName =
    firstListArray.find((itemName) => secondList.includes(itemName) && thirdList.includes(itemName)) ?? "";
  const priority = getPriority(duplicateItemName);
  return sum + priority;
}, 0);

/*
  Output
*/

console.log("===== Question 3 =====");
console.log("\n----- Part 1 -----");
console.log(prioritySumPart1);
console.log("\n----- Part 2 -----");
console.log(prioritySumPart2);
console.log("\n===== End Question 3 =====\n");
