import { promises as fs } from "fs";

export const readInputFile = async (): Promise<string[]> =>
  await fs.readFile("day-/input.txt", "utf8").then((data) => data.split(/\n/g));

const main = () => {
  readInputFile().then((data) => {
    console.log(data);
  });
};

main();
