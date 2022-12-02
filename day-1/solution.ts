import { promises as fs } from "fs";

export const readInputFile = async (): Promise<number[]> =>
  await fs.readFile("day-1/input.txt", "utf8").then((data) => {
    return data.split(/\n/g).map((v) => (!!v ? parseInt(v, 10) : -1));
  });

const main = () => {
  readInputFile().then((data) => {
    let elves: number[][] = [];
    let i = 0;
    let j = 0;

    data.forEach((line, index) => {
      if (index === 0) {
        elves[i] = [];
      }
      if (line !== -1) {
        elves[i][j] = line;
        j++;
      } else {
        i++;
        j = 0;
        elves[i] = [];
      }
    });

    let sumCaloriesByElves = elves.map((elf: number[]) =>
      elf.reduce((a: number, c: number) => a + c, 0)
    );

    let max = Math.max(...sumCaloriesByElves);

    console.log("Top calories: ", max);

    sumCaloriesByElves.sort((a, b) => a - b);
    sumCaloriesByElves.reverse();

    let top3 = sumCaloriesByElves
      .filter((sum, i) => i < 3)
      .reduce((a, c) => a + c, 0);

    console.log("Top 3 calories: ", top3);
  });
};

main();
