import { promises as fs } from "fs";
import { HandShape, Outcome, Round, scoreTable } from "./model";

const getHandShape = (key: string): HandShape => {
  switch (key) {
    case "A":
    case "X":
      return HandShape.ROCK;
    case "B":
    case "Y":
      return HandShape.PAPER;
    case "C":
    case "Z":
      return HandShape.SCISSORS;
  }
};

const getOutcome = (opponent: HandShape, ally: HandShape): Outcome => {
  if (opponent === ally) {
    return Outcome.DRAW;
  }

  if (
    (ally === HandShape.ROCK && opponent === HandShape.PAPER) ||
    (ally === HandShape.PAPER && opponent === HandShape.SCISSORS) ||
    (ally === HandShape.SCISSORS && opponent === HandShape.ROCK)
  ) {
    return Outcome.LOST;
  }

  return Outcome.WIN;
};

export const readInputFile = async (): Promise<Round[]> =>
  await fs.readFile("day-2/input.txt", "utf8").then((data) =>
    data
      .split(/\n/g)
      .map((v) => v.split(" "))
      .map(
        ([opponent, ally]) =>
          <Round>{ opponent: getHandShape(opponent), ally: getHandShape(ally) }
      )
  );

const main = () => {
  readInputFile().then((data) => {
    let finalScore = data.reduce(
      (accumulator, round) =>
        accumulator +
        scoreTable[round.ally] +
        scoreTable[getOutcome(round.opponent, round.ally)],
      0
    );
    console.log(finalScore);
  });
};

main();
