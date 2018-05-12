export class CarClass {
  constructor(name, gameBaseDetails) {
    this.name = name;
    this.x = 0;
    this.y = 0;
    this.angle = 0;
    this.move = 0;
    this.gameBase = gameBaseDetails;
    this.gas = false;
    this.rev = false;
    this.turnL = false;
    this.turnR = false;
    this.groundSpeedDecay = 0.94;
    this.drivePower = 0.5;
    this.reversePower = 0.2;
    this.turnRate = 0.06;
    this.minSpeedToTurn = 0.5;
    this.won = false;
    this.originalX = 0;
    this.originalY = 0;
  }

  setCar(colWidth, rowHeight, numOfRows, numOfCols, whichLayoutCode) {
    // draw tiles
    let tileToBeDrawn = 0;
    let cellY = 0;
    let cellX = 0;
    const layout = this.gameBase.layout;

    this.gameBase.startTime = new Date().getTime();


    for (let rowIndex = 0; rowIndex < numOfRows; rowIndex++) {
      for (let colIndex = 0; colIndex < numOfCols; colIndex++) {
        if (layout[tileToBeDrawn] === whichLayoutCode) {
          layout[tileToBeDrawn] = 0;
          this.angle = -Math.PI / 2;
          this.x = cellX + (colWidth * 0.5);
          this.y = cellY + (rowHeight * 0.5);
          this.originalX = cellX + (colWidth * 0.5);
          this.originalY = cellY + (rowHeight * 0.5);
        }
        cellX += colWidth;
        tileToBeDrawn++;
      }
      cellY += rowHeight;
      cellX = 0;
    }
  }

  reset() {
    this.angle = -Math.PI / 2;
    this.x = this.originalX;
    this.y = this.originalY;
    this.move = 0;
    this.won = false;
  }
}
