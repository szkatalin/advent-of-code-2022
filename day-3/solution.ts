import { promises as fs } from "fs";

const abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const readInputFile = async (): Promise<string[]> =>
  await fs.readFile("day-3/input.txt", "utf8").then((data) => {
    return data.split(/\n/g);
  });

const main = () => {
  readInputFile().then((data) => {
    const value = data
      .map((line) => {
        const alphabets = line.split("");
        const [first, second] = [
          alphabets.slice(0, alphabets.length / 2),
          alphabets.slice(alphabets.length / 2),
        ];
        let alphabet;
        for (let i = 0; i < first.length; i++) {
          let exit = false;
          for (let j = 0; j < second.length && !exit; j++) {
            if (first[i] === second[j]) {
              alphabet = first[i];
              exit=true;
            }
          }
        }
        return alphabet;
      })
      .map((a) => abc.split("").findIndex((v) => v === a) + 1)
      .reduce((a, c) => a + c, 0);

    console.log(value);
  });
};

main();
