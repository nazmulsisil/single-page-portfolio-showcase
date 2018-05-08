import {
  getLayout
} from './layouts';
import {
  allImgSetToLoad
} from './allImgSetToLoad';
import {
  events
} from './events';
import {
  rect,
  text
} from '../Drawings';
import {
  drawEverything
} from './drawEverything';
import {
  CarClass
} from './CarClass';
import {
  moveEverything
} from './moveEverything';

function racingCanvas() {
  const canvas = document.getElementById('racing-canvas');
  const context = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;
  const fps = 30;
  const colWidth = 40;
  const rowHeight = 40;
  const numOfCols = Math.ceil(w / colWidth);
  const numOfRows = Math.ceil(h / rowHeight);

  const chosenLayout = getLayout('level1');

  const imgTags = allImgSetToLoad(chosenLayout);
  const htmlTags = imgTags.htmlTags;
  const uniquePicCodes = imgTags.uniquePicCodes;
  let picturesToLoad = imgTags.picturesToLoad;


  const blueCar = new CarClass(chosenLayout);
  const greenCar = new CarClass(chosenLayout);

  // Loading screen
  rect(context, 0, 0, w, h, 'green');
  text(context, 'Loading...', (w * 0.5) - 50, h * 0.5, 'white');

  // waiting to load all the images, after loading done, run other codings.
  uniquePicCodes.forEach(picCode => {
    htmlTags[picCode].addEventListener('load', () => {
      picturesToLoad--;
      if (picturesToLoad === 0) {
        allImgLoadedSoRunOtherCodings();
      }
    });
  });


  function allImgLoadedSoRunOtherCodings() {
    blueCar.resetCar(colWidth, rowHeight, numOfRows, numOfCols, 2);
    greenCar.resetCar(colWidth, rowHeight, numOfRows, numOfCols, 6);
    setInterval(repeatCall, 1000 / fps);
  }

  function repeatCall() {
    moveEverything(blueCar);
    drawEverything(
      context, chosenLayout, htmlTags,
      numOfRows, numOfCols,
      colWidth, rowHeight,
      blueCar.x, blueCar.y, blueCar.angle,
      greenCar.x, greenCar.y, greenCar.angle
    );
  }
}

export default racingCanvas;
