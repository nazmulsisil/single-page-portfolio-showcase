// helper function, find the object from an array by property of found object.
export const findObjFromArray = (whichArray, whichProp, whichValue) => {
  const tempoArray = [];
  whichArray.forEach(el => {
    if (el[whichProp] === whichValue) {
      tempoArray.push(el);
    }
  });
  return tempoArray[0]; // returning first one, if in case multiple items found
};
