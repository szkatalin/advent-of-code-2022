import { promises as fs } from "fs";

const firstUniqueSectionIndex = (arr: string[], N: number) => {
  let i;
  let exit = false;
  for (i = 0; i < arr.length && !exit; i++) {
    const part = arr.slice(i, i + N);
    exit = [...new Set(part)].length === part.length;
  }
  return i + N - 1;
};

export const readInputFile = async (): Promise<string[]> =>
  await fs.readFile("day-6/input.txt", "utf8").then((data) => data.split(""));

const main = () => {
  readInputFile().then((c) => {
    console.log(firstUniqueSectionIndex(c, 4));
    console.log(firstUniqueSectionIndex(c, 14));
  });
};

main();
