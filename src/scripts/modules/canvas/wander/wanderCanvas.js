import { getLayout } from './layouts';
import { events } from './events';
import drawEverything from './drawEverything';
import moveEverything from './moveEverything';
import { createBallsArray, defineRect, r } from './helperFunctions';
import { rect, text } from '../Drawings';

function wander(whichLevel = 'level1') {
  // define all the base properties of the game in here at 1 place
  // for central state management across different JS files.
  const $ = {};
  $.canvas = document.getElementById('wander-canvas');
  $.context = $.canvas.getContext('2d');
  $.w = $.canvas.width;
  $.h = $.canvas.height;
  $.mX = $.w * 0.5;
  $.mY = $.h * 0.5;
  $.fps = 30;
  $.colWidth = 40;
  $.rowHeight = 40;
  $.numOfCols = Math.floor($.w / $.colWidth);
  $.numOfRows = Math.floor($.h / $.rowHeight);
  $.layoutName = whichLevel;
  $.layout = getLayout(`level${r(5, 1)}`);
  $.numOfBalls = 20;
  $.ballsArr = createBallsArray($);
  $.ballsAreRunning = false;
  $.startStop = new defineRect(5, 565, 70, 30);
  $.reset = new defineRect(85, 565, 70, 30);
  $.destroy = new defineRect(165, 565, 70, 30);
  $.destructionOn = false;
  $.started = false;

  events($);

  // Initial load of the black canvas
  rect($.context, 0, 0, $.w, $.h);
  text($.context, 'Click to continue!', 100, 80, 'white');

  setInterval(repeatCall, 1000 / $.fps);

  function repeatCall() {
    if ($.started) {
      drawEverything($);
      if ($.ballsAreRunning) moveEverything($);
    }
  }
}

export default wander;
