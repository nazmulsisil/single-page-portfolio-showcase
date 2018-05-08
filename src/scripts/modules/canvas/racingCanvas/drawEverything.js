import {
  drawBitmapCenteredWithRotation
} from '../Drawings';

export const drawEverything = (
  context, chosenLayout, htmlTags,
  numOfRows, numOfCols,
  colWidth, rowHeight,
  blueCarX, blueCarY, blueCarAngle,
  greenCarX, greenCarY, greenCarAngle
) => {
  // draw tiles
  let tileToBeDrawn = 0;
  let cellY = 0;
  let cellX = 0;

  for (let rowIndex = 0; rowIndex < numOfRows; rowIndex++) {
    for (let colIndex = 0; colIndex < numOfCols; colIndex++) {
      context.drawImage(htmlTags[chosenLayout[tileToBeDrawn]], cellX, cellY);
      cellX += colWidth;
      tileToBeDrawn++;
    }
    cellY += rowHeight;
    cellX = 0;
  }

  drawBitmapCenteredWithRotation(context, htmlTags[2], blueCarX, blueCarY, blueCarAngle);
  drawBitmapCenteredWithRotation(context, htmlTags[6], greenCarX, greenCarY, greenCarAngle);
};
