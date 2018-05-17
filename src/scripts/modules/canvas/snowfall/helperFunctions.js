// Random number
export const r = (max, min = 0, numberToExclude) => {
  let newNumber;

  do {
    newNumber = min + Math.floor(Math.random() * (max - min + 1));
  } while (newNumber === numberToExclude);

  return newNumber;
};
