import { tile } from './helperFunctions';

const moveEverything = $ => {
  $.ballsArr.forEach((ball, i) => {
    ball.x += ball.moveX;
    ball.y += ball.moveY;

    if (ball.x < 0 || ball.x > $.w) {
      $.ballsArr.splice(i, 1);
    }

    if (ball.y < 0 || ball.y > $.h) {
      $.ballsArr.splice(i, 1);
    }

    const curTile = tile($, {
      x: ball.x,
      y: ball.y
    });
    const curTileIndex = curTile.i;
    const curRow = curTile.row;
    const curCol = curTile.col;
    const prevBallX = ball.x - ball.moveX;
    const prevBallY = ball.y - ball.moveY;
    const prevTile = tile($, {
      x: prevBallX,
      y: prevBallY
    });
    const prevTileIndex = prevTile.i;
    const prevRow = prevTile.row;
    const prevCol = prevTile.col;
    const onlyColChanged = prevRow === curRow && prevCol !== curCol;
    const onlyRowChanged = prevRow !== curRow && prevCol === curCol;
    const bothChanged = prevRow !== curRow && prevCol !== curCol;
    const ballMovingUpward = prevBallY > ball.y;
    const ballMovingLeft = prevBallX > ball.x;
    const ballHasHitTile = $.layout[curTileIndex] === 1;

    if (ballHasHitTile) {
      if ($.destructionOn) $.layout[curTileIndex] = 0;

      if (onlyColChanged) {
        reverse(ball, 'x');
      } else if (onlyRowChanged) {
        reverse(ball, 'y');
      } else if (bothChanged) {
        // make sure the side we want to reflect off isn't blocked!
        if (
          // auto coercing to booleans from zero and non zero pic codes
          !$.layout[
            ballMovingUpward
              ? prevTileIndex - $.numOfCols
              : prevTileIndex + $.numOfCols
          ]
        ) {
          reverse(ball, 'x');
        }
        // make sure the side we want to reflect off isn't blocked!
        if (!$.layout[ballMovingLeft ? prevTileIndex - 1 : prevTileIndex + 1]) {
          reverse(ball, 'y');
        }
        // Armpit case
        if (
          $.layout[
            // auto coercing to booleans from zero and non zero pic codes
            ballMovingUpward
              ? prevTileIndex - $.numOfCols
              : prevTileIndex + $.numOfCols
          ] &&
          $.layout[ballMovingLeft ? prevTileIndex - 1 : prevTileIndex + 1]
        ) {
          reverse(ball, 'x');
          reverse(ball, 'y');
        }
      }
    }
  });

  if ($.ballsArr.length === 0) {
    $.ballsAreRunning = false;
  } else {
    $.ballsAreRunning = true;
  }

  function reverse(ball, direction) {
    if (direction === 'x') ball.moveX *= -1;
    else if (direction === 'y') ball.moveY *= -1;
    else if (direction === 'both') {
      ball.moveX *= -1;
      ball.moveY *= -1;
    }
  }
};

export default moveEverything;
