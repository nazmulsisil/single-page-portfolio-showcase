import { getLayout } from './layouts';
import { tile, createBallsArray, r } from './helperFunctions';

const wanderInput = document.getElementById('numOfBalls');
const wanderInputGroup = document.getElementById('wander-g');

export const events = $ => {
  $.canvas.addEventListener('mousemove', mousePos);
  $.canvas.addEventListener('click', clicked);

  wanderInput.addEventListener('change', inputChanged);

  function mousePos(e) {
    const rectangle = $.canvas.getBoundingClientRect();

    $.mX = e.clientX - rectangle.left;
    $.mY = e.clientY - rectangle.top;
  }

  function clicked(e) {
    const rectangle = $.canvas.getBoundingClientRect();
    $.mX = e.clientX - rectangle.left;
    $.mY = e.clientY - rectangle.top;
    const clickedOnTileIndex = tile($, { x: $.mX, y: $.mY }).i;

    // Start game on click
    if (!$.stated) {
      $.started = true;
      wanderInputGroup.style.visibility = 'visible';
    }

    // Start / Stop clicked
    if (wasClicked($.startStop)) {
      $.ballsAreRunning = !$.ballsAreRunning;
    }

    // Reset clicked
    if (wasClicked($.reset)) {
      $.destructionOn = false;
      $.ballsAreRunning = false;
      $.layoutName = `level${r(5, 1, $.layoutName.slice(-1))}`;
      $.layout.forEach((picCode, i) => {
        $.layout[i] = getLayout($.layoutName)[i];
      });

      $.ballsArr = createBallsArray($);
    }

    // Destroy clicked
    if (wasClicked($.destroy)) {
      $.destructionOn = true;
    }

    // Add tile/remove tile onclick
    if (notWithinOptionButtons()) {
      if ($.layout[clickedOnTileIndex]) {
        $.layout[clickedOnTileIndex] = 0;
      } else {
        $.layout[clickedOnTileIndex] = 1;
      }
    }

    // helper function: find out which rect was clicked
    function wasClicked(whichRect) {
      if (
        $.mX > whichRect.left &&
        $.mX < whichRect.right &&
        $.mY > whichRect.top &&
        $.mY < whichRect.bottom
      ) {
        return true;
      }
      return false;
    }

    // Internal helper function to ensure that the click was not on option buttons
    function notWithinOptionButtons() {
      if (
        clickedOnTileIndex === 280 ||
        clickedOnTileIndex === 281 ||
        clickedOnTileIndex === 282 ||
        clickedOnTileIndex === 283 ||
        clickedOnTileIndex === 284 ||
        clickedOnTileIndex === 285
      ) {
        return false;
      }
      return true;
    }
  }

  function inputChanged() {
    // $.numOfBalls =
    const numOfBallsInput = wanderInput.value;
    wanderInput.value = '';
    $.numOfBalls = numOfBallsInput;
    $.ballsArr = [];
    $.ballsArr = createBallsArray($);
  }
};
