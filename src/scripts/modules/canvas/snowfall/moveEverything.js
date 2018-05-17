import { SnowClass } from './SnowClass';

const moveEverything = $ => {
  $.snowsArr.push(new SnowClass($));
  $.snowsArr.push(new SnowClass($));

  // Loop through the snows array and determine their new position
  $.snowsArr.forEach((snow, i) => {
    snow.y += snow.moveY;

    // Splicing out from the array when distant snows reached earth
    if (snow.y > $.h * 0.7 && snow.moveY <= 1.5) $.snowsArr.splice(i, 1);
    // Splicing out from the array if snow fall out of the screen
    if (snow.y > $.h + 200) $.snowsArr.splice(i, 1);
  });
};

export default moveEverything;
