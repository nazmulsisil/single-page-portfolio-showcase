import { r } from './helperFunctions';

export class SnowClass {
  constructor($) {
    const speed = r(3, 1);
    this.moveY = speed;
    this.x = r($.w);
  }
}

SnowClass.prototype.y = 0;
SnowClass.prototype.radius = 2;
