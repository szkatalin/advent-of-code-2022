import { promises as fs } from "fs";

interface Command {
  count: number;
  from: number;
  to: number;
}

export const readInputFile = async (): Promise<string[]> =>
  await fs
    .readFile("day-5/input.txt", "utf8")
    .then((data) => data.split(/\n/g));

const main = () => {
  readInputFile().then((data) => {
    // let stacksSample: string[][] = [["Z", "N"], ["M", "C", "D"], ["P"]];
    let stacks: string[][] = [
      ["V", "C", "D", "R", "Z", "G", "B", "W"],
      ["G", "W", "F", "C", "B", "S", "T", "V"],
      ["C", "B", "S", "N", "W"],
      ["Q", "G", "M", "N", "J", "V", "C", "P"],
      ["T", "S", "L", "F", "D", "H", "B"],
      ["J", "V", "T", "W", "M", "N"],
      ["P", "F", "L", "C", "S", "T", "G"],
      ["B", "D", "Z"],
      ["M", "N", "Z", "W"],
    ];

    let commands: Command[] = data.map((line) => {
      let parts = line.split(" ");
      return <Command>{
        count: parseInt(parts[1]),
        from: parseInt(parts[3]) - 1,
        to: parseInt(parts[5]) - 1,
      };
    });

    // Part 1
    // commands.forEach((command) => {
    //   for (let i = 0; i < command.count; i++) {
    //     stacks[command.to].push(stacks[command.from].pop());
    //   }
    // });

    // console.log(stacks.map((s) => s[s.length - 1]).join(""));

    // Part 2
    commands.forEach((command) => {
      let itemsToPush: string[] = [];
      for (let i = 0; i < command.count; i++) {
        itemsToPush.push(stacks[command.from].pop());
      }
      itemsToPush.reverse().forEach((e) => stacks[command.to].push(e));
    });

    console.log(stacks.map((s) => s[s.length - 1]).join(""));
  });
};

main();
