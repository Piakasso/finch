import { INumbers } from "../types/types";

export const generateRandomNumbers = (count: number): INumbers => {
  const firstFieldArray: number[] = [];
  const secondFieldArray = [];
  do {
    const randomNum = Math.floor(Math.random() * 19 + 1);
    if (!firstFieldArray.includes(randomNum)) {
      firstFieldArray.push(randomNum);
    }
  } while (firstFieldArray.length < count);

  const randomSecondFieldNum = Math.floor(Math.random() * 2 + 1);

  secondFieldArray.push(randomSecondFieldNum);

  return {
    firstField: firstFieldArray,
    secondField: secondFieldArray,
  };
};
