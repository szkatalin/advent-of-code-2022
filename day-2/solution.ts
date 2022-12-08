import { promises as fs } from "fs";
import {
  HandShape,
  handShapeConfig,
  Outcome,
  outcomeConfig,
  Round,
  scoreTable,
} from "./model";

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

const getAllyHandShape = (opponent: HandShape, outcome: Outcome): HandShape => {
  if (outcome === Outcome.DRAW) {
    return opponent;
  }

  if (opponent === HandShape.ROCK) {
    return outcome === Outcome.LOST ? HandShape.SCISSORS : HandShape.PAPER;
  }

  if (opponent === HandShape.PAPER) {
    return outcome === Outcome.LOST ? HandShape.ROCK : HandShape.SCISSORS;
  }

  if (opponent === HandShape.SCISSORS) {
    return outcome === Outcome.LOST ? HandShape.PAPER : HandShape.ROCK;
  }
};

export const readInputFile = async (): Promise<string[][]> =>
  await fs
    .readFile("day-2/input.txt", "utf8")
    .then((data) => data.split(/\n/g).map((v) => v.split(" ")));

const main = () => {
  readInputFile().then((data) => {
    let finalScore = data
      .map(
        ([opponent, ally]) =>
          <Round>{
            opponent: handShapeConfig[opponent],
            ally: handShapeConfig[ally],
          }
      )
      .reduce(
        (a, round) =>
          a +
          scoreTable[round.ally] +
          scoreTable[getOutcome(round.opponent, round.ally)],
        0
      );
    console.log(finalScore);

    finalScore = data
      .map(
        ([opponent, ally]) =>
          <Round>{
            opponent: handShapeConfig[opponent],
            ally: getAllyHandShape(handShapeConfig[opponent], outcomeConfig[ally]),
          }
      )
      .reduce(
        (a, round) =>
          a +
          scoreTable[round.ally] +
          scoreTable[getOutcome(round.opponent, round.ally)],
        0
      );
    console.log(finalScore);
  });
};

main();
