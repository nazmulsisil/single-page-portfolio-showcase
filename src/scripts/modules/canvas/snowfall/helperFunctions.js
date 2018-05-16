// Random number
export const r = (max, min = 0, numberToExclude) => {
  let newNumber;

  do {
    newNumber = min + Math.floor(Math.random() * (max - min + 1));
  } while (newNumber === numberToExclude);

  return newNumber;
};

// For creating balls Array
export const createSnowArray = $ => {
  if ($.numOfSnows > 800) $.numOfSnows = 800;
  const createdSnowArray = [];
  for (let i = 0; i < $.numOfSnows; i++) {
    createdSnowArray.push(new SnowClass($));
  }
  return createdSnowArray;
};
