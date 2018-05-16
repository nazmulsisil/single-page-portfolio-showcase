import { r, tile } from './helperFunctions';

export class BallClass {
  constructor($) {
    const angle = Math.random() * Math.PI * 2.0;
    const speed = r(7, 3);

    this.moveX = Math.cos(angle) * speed;
    this.moveY = Math.sin(angle) * speed;
    do {
      this.x = r($.w);
      this.y = r($.h);
    } while (!this.isInEmptyTile($, this.x, this.y));
  }

  isInEmptyTile($, x, y) {
    const inTile = tile($, { x, y });
    return $.layout[inTile.i] === 0;
  }
}
BallClass.prototype.radius = 2;
