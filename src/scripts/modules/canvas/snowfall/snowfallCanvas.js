import { events } from './events';
import drawEverything from './drawEverything';
import { SnowClass } from './SnowClass';
import moveEverything from './moveEverything';
import { rect, text } from '../Drawings';

function snowfallCanvas() {
  // define all the base properties of the game in here at 1 place
  // for central state management across different JS files.
  const $ = {};
  $.canvas = document.getElementById('snowfall-canvas');
  $.context = $.canvas.getContext('2d');
  $.w = $.canvas.width;
  $.h = $.canvas.height;
  $.fps = 30;
  $.snowsArr = [];
  $.numOfSnows = 0;

  $.htmlTag = document.createElement('img');
  $.htmlTag.addEventListener('load', imgLoadedInHtml);

  function imgLoadedInHtml(e) {
    imgLoadedSoRunOtherStuffs();
  }

  $.htmlTag.src = './../img/snowfall.png';

  events($);

  // Initial load of the black canvas
  rect($.context, 0, 0, $.w, $.h);
  text($.context, 'Click to continue!', 100, 80, 'white');

  function imgLoadedSoRunOtherStuffs() {
    for (let i = 0; i < $.numOfSnows; i++) {
      $.snowsArr.push(new SnowClass($));
    }

    setInterval(repeatCall, 1000 / $.fps);
  }

  function repeatCall() {
    drawEverything($);
    moveEverything($);
  }
}

export default snowfallCanvas;
