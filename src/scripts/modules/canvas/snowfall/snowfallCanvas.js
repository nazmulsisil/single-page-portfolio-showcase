import { events } from './events';
import drawEverything from './drawEverything';
import moveEverything from './moveEverything';
import { rect, text } from '../Drawings';
import { r } from './helperFunctions';

function snowfallCanvas() {
  // define all the base properties of the game in here at 1 place
  // for central state management across different JS files.
  const $ = {};
  $.canvas = document.getElementById('snowfall-canvas');
  $.context = $.canvas.getContext('2d');
  $.w = $.canvas.width;
  $.h = $.canvas.height;
  $.fps = 30;
  $.started = false;
  $.snowsArr = [];
  $.htmlTag = document.createElement('img');
  $.htmlTag.addEventListener('load', () => imgLoadedSoRunOtherStuffs());
  $.htmlTag.src = './../img/snowfall.png';
  events($);

  // Initial load of the black canvas
  rect($.context, 0, 0, $.w, $.h);
  text(
    $.context,
    'Loading...',
    $.w * 0.5,
    $.h * 0.5,
    'white',
    undefined,
    'center'
  );

  function imgLoadedSoRunOtherStuffs() {
    rect($.context, 0, 0, $.w, $.h);
    text($.context, 'Click to see animated snowfall...!', 100, 80, 'white');
    setInterval(repeatCall, 1000 / $.fps);
  }

  function repeatCall() {
    if ($.started) {
      drawEverything($);
      moveEverything($);
    }
  }
}

export default snowfallCanvas;
