export class CarClass {
  constructor(chosenLayout) {
    this.x = 0;
    this.y = 0;
    this.angle = 0;
    this.layout = chosenLayout;
  }

  resetCar(colWidth, rowHeight, numOfRows, numOfCols, whichLayoutCode) {
    // draw tiles
    let tileToBeDrawn = 0;
    let cellY = 0;
    let cellX = 0;
    const layout = this.layout;

    for (let rowIndex = 0; rowIndex < numOfRows; rowIndex++) {
      for (let colIndex = 0; colIndex < numOfCols; colIndex++) {
        if (layout[tileToBeDrawn] === whichLayoutCode) {
          layout[tileToBeDrawn] = 0;
          this.angle = -Math.PI / 2;
          this.x = cellX + (colWidth * 0.5);
          this.y = cellY + (rowHeight * 0.5);
        }
        cellX += colWidth;
        tileToBeDrawn++;
      }
      cellY += rowHeight;
      cellX = 0;
    }
  }
}
