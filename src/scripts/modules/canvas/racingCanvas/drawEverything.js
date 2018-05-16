import { drawBitmapCenteredWithRotation, text, rect } from '../Drawings';
import { winnerIs } from './helperFunctions';

export const drawEverything = (
  context,
  gameBaseDetails,
  htmlTags,
  numOfRows,
  numOfCols,
  colWidth,
  rowHeight,
  blueCar,
  greenCar
) => {
  // draw tiles
  const w = context.canvas.width;
  const h = context.canvas.height;
  let tileToBeDrawn = 0;
  let cellY = 0;
  let cellX = 0;
  const blueCarX = blueCar.x;
  const blueCarY = blueCar.y;
  const blueCarAngle = blueCar.angle;
  const greenCarX = greenCar.x;
  const greenCarY = greenCar.y;
  const greenCarAngle = greenCar.angle;
  const baseDetails = gameBaseDetails;
  const chosenLayout = baseDetails.layout;

  for (let rowIndex = 0; rowIndex < numOfRows; rowIndex++) {
    for (let colIndex = 0; colIndex < numOfCols; colIndex++) {
      context.drawImage(htmlTags[chosenLayout[tileToBeDrawn]], cellX, cellY);
      cellX += colWidth;
      tileToBeDrawn++;
    }
    cellY += rowHeight;
    cellX = 0;
  }

  // blue car
  drawBitmapCenteredWithRotation(
    context,
    htmlTags[2],
    blueCarX,
    blueCarY,
    blueCarAngle
  );
  // green car
  drawBitmapCenteredWithRotation(
    context,
    htmlTags[6],
    greenCarX,
    greenCarY,
    greenCarAngle
  );

  // level's label highlight
  let highLightX;
  if (baseDetails.layoutName === 'level1') highLightX = 3;
  if (baseDetails.layoutName === 'level2') highLightX = 83;
  if (baseDetails.layoutName === 'level3') highLightX = 163;

  // label of level 1
  rect(context, highLightX, context.canvas.height - 37, 74, 34, 'black');
  rect(context, 5, context.canvas.height - 35, 70, 30, 'rgba(0,55,0,0.8)');
  text(context, 'Level 1', 10, context.canvas.height - 13, 'white');
  // label of level 1
  rect(context, 85, context.canvas.height - 35, 70, 30, 'rgba(20,100,200,0.8)');
  text(context, 'Level 2', 90, context.canvas.height - 13, 'white');
  // label of level 1
  rect(context, 165, context.canvas.height - 35, 70, 30, 'rgba(150,0,0,0.8)');
  text(context, 'Level 3', 170, context.canvas.height - 13, 'white');

  // If race is over, any of the players has crossed the finish line
  if (winnerIs(blueCar, greenCar)) {
    // Finished message
    rect(context, 0, 40, w, 80, 'rgba(0,0,0,0.8)');
    text(
      context,
      `${winnerIs(blueCar, greenCar)} won. Click to play again!`,
      w * 0.5 - 155,
      88,
      'white'
    );
    // while race is running
  } else if (baseDetails.countdownTime() === 'Go...') {
    baseDetails.winningTime = baseDetails.lapTime(2);
  } else {
    // Display Countdown time
    rect(context, 40, 40, w - 80, h - 80, 'rgba(0,0,0,0.2)');
    text(
      context,
      baseDetails.countdownTime(),
      w * 0.5,
      400,
      'white',
      '250pt',
      'center',
      'bold'
    );
  }

  // Race Timer
  rect(context, w - 80, h - 40, 80, 70, '#FF5500');
  rect(context, w - 80, h - 40, 78, 38, 'rgba(0,0,0,1)');
  text(
    context,
    baseDetails.winningTime,
    w - 8,
    h - 12,
    '#FF5500',
    undefined,
    'right'
  );
};
