import {
  imageProcessDoneForLevel
} from "./imageProcess";

function racingCanvasss() {
  const canvas = document.getElementById('racing-canvas');
  const context = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;
  const fps = 30;
  const colWidth = 40;
  const rowHeight = 40;
  const numOfCols = Math.ceil(w / colWidth);
  const numOfRows = Math.ceil(h / rowHeight);

  if (imageProcessDoneForLevel(1)) {
    console.log('well done, image processing completed');
    // setInterval(repeatCall, 1000 / fps);
  }
}
