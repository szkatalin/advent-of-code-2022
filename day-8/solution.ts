import { promises as fs } from "fs";

export const readInputFile = async (): Promise<number[][]> =>
  await fs
    .readFile("day-8/input.txt", "utf8")
    .then((data) =>
      data.split(/\n/g).map((v) => v.split("").map((v) => parseInt(v, 10)))
    );

const main = () => {
  readInputFile().then((data) => {
    let values = [];
    let count = 0;

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        if (
          i === 0 ||
          j === 0 ||
          i === data.length - 1 ||
          j === data[i].length - 1
        ) {
          count++;
        } else {
          // Part 1
          const top: number[] = data.slice(0, i).map((arr) => arr[j]);
          const bottom: number[] = data
            .slice(i + 1)
            .map((arr, index) => arr[j]);
          const left = data[i].slice(0, j);
          const right = data[i].slice(j + 1, data[i].length);

          if (
            top.every((e) => e < data[i][j]) ||
            bottom.every((e) => e < data[i][j]) ||
            left.every((e) => e < data[i][j]) ||
            right.every((e) => e < data[i][j])
          ) {
            count++;
          }

          // Part 2
          let topCount, leftCount, rightCount, bottomCount;
          topCount = bottomCount = leftCount = rightCount = 0;

          let exit = false;
          for (let k = top.length - 1; k >= 0 && !exit; k--) {
            ++topCount;
            exit = top[k] >= data[i][j];
          }

          exit = false;
          for (let k = left.length - 1; k >= 0 && !exit; k--) {
            ++leftCount;
            exit = left[k] >= data[i][j];
          }

          exit = false;
          for (let k = 0; k < right.length && !exit; k++) {
            ++rightCount;
            exit = right[k] >= data[i][j];
          }

          exit = false;
          for (let k = 0; k < bottom.length && !exit; k++) {
            ++bottomCount;
            exit = bottom[k] >= data[i][j];
          }

          values.push(topCount * bottomCount * leftCount * rightCount);
        }
      }
    }

    console.log(count);
    console.log(Math.max(...values));
  });
};

main();
