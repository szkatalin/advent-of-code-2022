import { promises as fs } from "fs";

export const readInputFile = async (): Promise<string[]> =>
  await fs.readFile("day-3/input.txt", "utf8").then((data) => {
    return data.split(/\n/g).map((v) => v);
  });

const main = () => {
  readInputFile().then((data) => {
    console.log(data);
  });
};

main();
