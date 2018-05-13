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


export const tile = (x, y, colWidth, rowHeight, numOfCols) => {
  let tileCol;
  let tileRow;

  if (x && y) {
    tileCol = Math.floor(x / colWidth);
    tileRow = Math.floor(y / rowHeight);
  }

  const num = (tileRow * numOfCols) + tileCol;

  return {
    col: tileCol,
    row: tileRow,
    num
  };
};

export const winnerIs = (blueC, greenC) => {
  if (blueC.won) return blueC.name;
  if (greenC.won) return greenC.name;
  return false;
};
