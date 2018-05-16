import { tile } from './helperFunctions';

export const moveEverything = (
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
  const blue = blueCar;
  const green = greenCar;
  const baseDetails = gameBaseDetails;
  const chosenLayout = baseDetails.layout;

  moveCar(blue);
  moveCar(green);

  function moveCar(whichCar) {
    const car = whichCar;
    car.move *= 0.96;
    if (car.gas) car.move += car.drivePower;
    if (car.rev) car.move -= car.reversePower;
    if (Math.abs(car.move) > car.minSpeedToTurn) {
      if (car.turnR) car.angle += car.turnRate;
      if (car.turnL) car.angle -= car.turnRate;
    }
    car.x += Math.cos(car.angle) * car.move;
    car.y += Math.sin(car.angle) * car.move;

    const curTile = tile(car.x, car.y, colWidth, rowHeight, numOfCols);
    const curTileNum = curTile.num;
    const curRow = curTile.row;
    const curCol = curTile.col;
    if (
      chosenLayout[curTileNum] &&
      curCol >= 0 &&
      curCol <= numOfCols - 1 &&
      curRow >= 0
    ) {
      if (chosenLayout[curTileNum] !== 3) {
        car.x -= Math.cos(car.angle) * car.move;
        car.y -= Math.sin(car.angle) * car.move;
        car.move *= -0.4;
      }
      if (
        chosenLayout[curTileNum] === 3 &&
        blue.won === false &&
        green.won === false
      ) {
        car.won = true;
      }
    }
  }
};
