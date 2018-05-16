import { arc } from '../Drawings';

const drawEverything = $ => {
  $.context.save();
  $.context.drawImage($.htmlTag, 0, 0);
  $.context.rotate(Math.PI / 180 * -15);

  $.snowsArr.forEach(snow => {
    arc($.context, snow.x - 50, snow.y, snow.radius, 'rgba(255,255,255,0.6)');
  });

  $.context.restore();
};

export default drawEverything;
