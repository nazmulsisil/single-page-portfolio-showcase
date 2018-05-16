import { BallClass } from './BallClass';

// Find the object from an array by property of found object.
export const findObjFromArray = (whichArray, whichProp, whichValue) => {
  const tempoArray = [];
  whichArray.forEach(el => {
    if (el[whichProp] === whichValue) {
      tempoArray.push(el);
    }
  });
  return tempoArray[0]; // returning first one, if in case multiple items found
};

// Get details of a certain x/y coordinates
export const tile = ($, coordsAsObj, tileIndex, detectMouse = false) => {
  let tileColIndex;
  let tileRowIndex;

  if (coordsAsObj !== undefined && coordsAsObj.x <= $.w && coordsAsObj.x >= 0) {
    tileColIndex = Math.floor(coordsAsObj.x / $.colWidth);
    tileRowIndex = Math.floor(coordsAsObj.y / $.rowHeight);
  }

  if (detectMouse) {
    tileColIndex = Math.floor($.mX / $.colWidth);
    tileRowIndex = Math.floor($.mY / $.rowHeight);
  }

  if (tileIndex !== undefined) {
    tileColIndex = tileIndex % $.numOfCols;
    tileRowIndex = Math.floor(tileIndex / $.numOfCols);
  }

  // returns column index, row index, tile index, x coordinate, y coordinate
  return {
    col: tileColIndex < $.numOfCols ? tileColIndex : undefined,
    row: tileRowIndex,
    i: tileIndex || tileRowIndex * $.numOfCols + tileColIndex,
    x: tileColIndex * $.colWidth,
    y: tileRowIndex * $.rowHeight
  };
};

// Random number
export const r = (max, min = 0, numberToExclude) => {
  let newNumber;

  do {
    newNumber = min + Math.floor(Math.random() * (max - min + 1));
  } while (newNumber === numberToExclude);

  return newNumber;
};

// For creating balls Array
export const createBallsArray = $ => {
  if ($.numOfBalls > 800) $.numOfBalls = 800;
  const createdBallsArray = [];
  for (let i = 0; i < $.numOfBalls; i++) {
    createdBallsArray.push(new BallClass($));
  }
  return createdBallsArray;
};

// To define a rectangle's 4 sides
export const defineRect = function(x, y, w, h) {
  this.left = x;
  this.right = this.left + w;
  this.top = y;
  this.bottom = this.top + h;
};
