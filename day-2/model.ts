export enum HandShape {
  ROCK = "ROCK",
  PAPER = "PAPER",
  SCISSORS = "SCISSORS",
}

export enum Outcome {
  LOST = "LOST",
  DRAW = "DRAW",
  WIN = "WIN",
}

export class Round {
  opponent: HandShape;
  ally: HandShape;
}

export const scoreTable: { [key: string]: number } = {
  [HandShape.ROCK]: 1,
  [HandShape.PAPER]: 2,
  [HandShape.SCISSORS]: 3,
  [Outcome.WIN]: 6,
  [Outcome.DRAW]: 3,
  [Outcome.LOST]: 0,
};