import { SnowClass } from './SnowClass';

const moveEverything = $ => {
  $.snowsArr.push(new SnowClass($));
  $.snowsArr.push(new SnowClass($));

  $.snowsArr.forEach((snow, i) => {
    snow.y += snow.moveY;
    if (snow.y > $.h + 200) {
      $.snowsArr.splice(i, 1);
    }
  });
};

export default moveEverything;
