import { promises as fs } from "fs";

interface Section {
  start: number;
  end: number;
}

interface Pair {
  s1: Section;
  s2: Section;
}

export const readInputFile = async (): Promise<Pair[]> =>
  await fs.readFile("day-4/input.txt", "utf8").then((data) =>
    data.split(/\n/g).map((line) => {
      let [p1, p2] = line.split(",");
      let [s1, s2] = [p1.split("-"), p2.split("-")];
      return <Pair>{
        s1: <Section>{ start: parseInt(s1[0], 10), end: parseInt(s1[1], 10) },
        s2: <Section>{ start: parseInt(s2[0], 10), end: parseInt(s2[1], 10) },
      };
    })
  );

const main = () => {
  readInputFile().then((data) => {
    let overlapped = data.filter(
      (pair) =>
        (pair.s1.start >= pair.s2.start && pair.s1.end <= pair.s2.end) ||
        (pair.s2.start >= pair.s1.start && pair.s2.end <= pair.s1.end)
    );

    console.log(overlapped.length);

    overlapped = data.filter(
      (pair) =>
        (pair.s1.start >= pair.s2.start && pair.s1.start <= pair.s2.end) ||
        (pair.s2.start >= pair.s1.start && pair.s2.start <= pair.s1.end)
    );

    console.log(overlapped.length);
  });
};

main();
