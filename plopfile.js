/** @param plop {import('plop').NodePlopAPI} */
export default function (plop) {
  plop.setGenerator("day", {
    description: "create starter files for a day in Advent of Code",
    prompts: [
      {
        type: "input",
        name: "day",
        message: "day number, e.g. 02 or 14",
      },
    ],
    actions: [
      {
        type: "add",
        path: "day-{{day}}/ts/index.ts",
        templateFile: "plop-templates/day/index.ts.hbs",
      },
      {
        type: "add",
        path: "day-{{day}}/data",
      },
      {
        type: "add",
        path: "day-{{day}}/instructions.md",
      },
    ],
  });
}
