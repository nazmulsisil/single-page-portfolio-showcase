import {
  getLayout
} from './layouts';

export const events = (
  context, gameBaseDetails, htmlTags,
  numOfRows, numOfCols,
  colWidth, rowHeight,
  blueCar, greenCar
) => {
  const blueCarKeys = [37, 38, 39, 40];
  const greenCarKeys = [65, 68, 87, 83];
  const blue = blueCar;
  const green = greenCar;
  const canvas = context.canvas;

  const baseDetails = gameBaseDetails;

  canvas.addEventListener('click', clicked);
  document.addEventListener('keydown', keyPressed);
  document.addEventListener('keyup', keyReleased);

  function keyPressed(evt) {
    const pressedKey = evt.keyCode;
    if (blueCarKeys.includes(pressedKey) || greenCarKeys.includes(pressedKey)) {
      evt.preventDefault();
    }

    // determine which car to move on which keys
    const car = (function () {
      if (blueCarKeys.includes(pressedKey)) return blue;
      if (greenCarKeys.includes(pressedKey)) return green;
    }());

    flipGear(car, pressedKey, true);
  }

  function keyReleased(evt) {
    const releasedKey = evt.keyCode;
    if (blueCarKeys.includes(releasedKey) || greenCarKeys.includes(releasedKey)) {
      evt.preventDefault();
    }

    // determine which car to move on which keys
    const car = (function () {
      if (blueCarKeys.includes(releasedKey)) return blue;
      if (greenCarKeys.includes(releasedKey)) return green;
    }());

    flipGear(car, releasedKey, false);
  }

  function flipGear(whichCar, keyCode, flipTo) {
    const car = whichCar;
    const gas = [38, 87];
    const rev = [40, 83];
    const turnL = [37, 65];
    const turnR = [39, 68];

    if (gas.includes(keyCode)) car.gas = flipTo;
    if (rev.includes(keyCode)) car.rev = flipTo;
    if (turnL.includes(keyCode)) car.turnL = flipTo;
    if (turnR.includes(keyCode)) car.turnR = flipTo;
  }

  function clicked(e) {
    if (blue.won || green.won) changeLevel(baseDetails.layoutName);

    const rectangle = canvas.getBoundingClientRect();
    const mousePosY = e.clientY - rectangle.top;
    const mousePosX = e.clientX - rectangle.left;

    const level1 = new defineRect(5, 565, 70, 30);
    const level2 = new defineRect(85, 565, 70, 30);
    const level3 = new defineRect(165, 565, 70, 30);

    if (wasClicked(level1)) changeLevel('level1');
    if (wasClicked(level2)) changeLevel('level2');
    if (wasClicked(level3)) changeLevel('level3');

    function defineRect(x, y, w, h) {
      this.left = x;
      this.right = this.left + w;
      this.top = y;
      this.bottom = this.top + h;
    }

    function wasClicked(whichRect) {
      if (
        mousePosX > whichRect.left &&
        mousePosX < whichRect.right &&
        mousePosY > whichRect.top &&
        mousePosY < whichRect.bottom
      ) {
        return true;
      }
      return false;
    }

    function changeLevel(toWhichLevelName) {
      baseDetails.layoutName = toWhichLevelName;
      baseDetails.layout = getLayout(baseDetails.layoutName);
      baseDetails.winningTime = '00:00';

      blue.setCar(colWidth, rowHeight, numOfRows, numOfCols, 2);
      green.setCar(colWidth, rowHeight, numOfRows, numOfCols, 6);

      blue.reset();
      green.reset();
    }
  }
};
