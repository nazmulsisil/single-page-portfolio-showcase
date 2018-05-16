import { r } from './helperFunctions';

export class SnowClass {
  constructor($) {
    const speed = r(3, 1);
    this.moveY = speed;
    this.x = r($.w, -200);
    this.radius = speed + (3 - speed) * 0.5;
  }
}

SnowClass.prototype.y = 0;
