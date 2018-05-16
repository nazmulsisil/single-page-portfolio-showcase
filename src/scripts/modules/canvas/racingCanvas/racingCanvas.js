import { getLayout } from './layouts';
import { allImgSetToLoad } from './allImgSetToLoad';
import { rect, text } from '../Drawings';
import { events } from './events';
import { drawEverything } from './drawEverything';
import { CarClass } from './CarClass';
import { moveEverything } from './moveEverything';
import { winnerIs } from './helperFunctions';
import { r } from '../wander/helperFunctions';

function racingCanvas(whichLevel = `level${r(3, 1)}`) {
  const canvas = document.getElementById('racing-canvas');
  const context = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;
  const fps = 30;
  const colWidth = 40;
  const rowHeight = 40;
  const numOfCols = Math.ceil(w / colWidth);
  const numOfRows = Math.ceil(h / rowHeight);

  const gameBaseDetails = new function() {
    this.layoutName = whichLevel;
    this.layout = getLayout(whichLevel);
    this.startTime = null;
    this.delayStartTime = 3;
    this.winningTime = '0:00';
    this.gameStarted = false;
    this.lapTime = decimal => {
      if (winnerIs(blueCar, greenCar)) return;
      return (
        (new Date() - this.startTime) / 1000 -
        this.delayStartTime
      ).toFixed(decimal);
    };
    this.timerCountDownTime = () =>
      ((new Date() - this.startTime) / 1000).toFixed(2);
    this.endTime = null;
    // countdown completed so open the car blocker bar
    this.countdownTime = () => {
      const layout = this.layout;
      const timer = this.timerCountDownTime();
      const delay = this.delayStartTime;
      if (this.timerCountDownTime() > this.delayStartTime) {
        while (layout.indexOf(7) !== -1) layout.splice(layout.indexOf(7), 1, 0);
        return 'Go...';
      }
      if (timer > delay * 0.8) return 'Go';
      if (timer > delay * 0.6) return '0';
      if (timer > delay * 0.4) return '1';
      if (timer > delay * 0.2) return '2';
      return 3;
    };
  }();

  const imgTags = allImgSetToLoad(gameBaseDetails);
  const htmlTags = imgTags.htmlTags;
  const uniquePicCodes = imgTags.uniquePicCodes;
  let picturesToLoad = imgTags.picturesToLoad;
  const blueCar = new CarClass('Blue Baron', gameBaseDetails);
  const greenCar = new CarClass('Green Comet', gameBaseDetails);

  // Loading screen
  rect(context, 0, 0, w, h, 'black');
  text(context, 'Loading...', w * 0.5 - 50, h * 0.5, 'white');

  const argsArray = [
    context,
    gameBaseDetails,
    htmlTags,
    numOfRows,
    numOfCols,
    colWidth,
    rowHeight,
    blueCar,
    greenCar
  ];

  // waiting to load all the images, after loading done, run other codings.
  uniquePicCodes.forEach(picCode => {
    htmlTags[picCode].addEventListener('load', () => {
      picturesToLoad--;
      if (picturesToLoad === 0) allImgLoadedSoRunOtherCodings();
    });
  });

  function allImgLoadedSoRunOtherCodings() {
    blueCar.setCar(colWidth, rowHeight, numOfRows, numOfCols, 2);
    greenCar.setCar(colWidth, rowHeight, numOfRows, numOfCols, 6);

    events.apply(this, argsArray);
    setInterval(repeatCall, 1000 / fps);
  }

  function repeatCall() {
    if (gameBaseDetails.gameStarted) {
      moveEverything.apply(this, argsArray);
      drawEverything.apply(this, argsArray);
    } else {
      // Loading screen
      rect(context, 0, 0, w, h, 'black');
      text(
        context,
        'Click to start racing...',
        w * 0.5,
        h * 0.5,
        'white',
        undefined,
        'center'
      );
    }
  }
}

export default racingCanvas;
