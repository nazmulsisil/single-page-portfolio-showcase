import {
  rect,
  arc,
  text
} from './Drawings';

export const initCanvas = () => {
  tennisCanvas();
  paranoidCanvas();
};

function tennisCanvas() {
  const canvas = document.getElementById('tennis-canvas');
  const context = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;

  const fps = 30;
  let gameIsOver = false;

  let mousePosY = h * 0.5;

  const paddleWidth = 6;
  const paddleHeight = 100;
  const leftPaddleX = 0;
  let leftPaddleY = (h * 0.5) - (paddleHeight * 0.5);
  let leftPaddleBottom = leftPaddleY + paddleHeight;
  const rightPaddleX = w - paddleWidth;
  let rightPaddleY = (h * 0.5) - (paddleHeight * 0.5);
  let rightPaddleBottom = rightPaddleY + paddleHeight;

  let ballPosX = w * 0.5;
  // let ballPosY = h * 0.5;
  let ballPosY = -15;
  let ballMoveX = 10;
  let ballMoveY = 10;

  let humanScore = 0;
  let botScore = 0;
  let leadPlayer = null;

  events();
  setInterval(repeatCall, 1000 / fps);

  function repeatCall() {
    move();
    draw();
  }

  function events() {
    canvas.addEventListener('mousemove', mousePos);
    canvas.addEventListener('click', restart);
  }

  function draw() {
    rect(context, 0, 0, w, h, 'black'); // canvas

    if (!gameIsOver) {
      rect(context, leftPaddleX, leftPaddleY, paddleWidth, paddleHeight, 'white'); // left paddle
      rect(context, rightPaddleX, rightPaddleY, paddleWidth, paddleHeight, 'white'); // right paddle

      for (let i = 0; i < h; i += 40) {
        rect(context, (w * 0.5) - 1, i, 2, 25, 'rgba(0,255,0,0.2)');
      } // divider net
      text(context, `You missed: ${humanScore}`, 100, 100, 'white');
      text(context, `Bot missed: ${botScore}`, w - 150, 100, 'white');
      arc(context, ballPosX, ballPosY, 10, 'yellow');
    } else {
      text(context, `${leadPlayer} won`, 100, 100, 'white');
      text(context, 'Click to continue', w - 150, 100, 'white');
    }
  }

  function move() {
    // left paddle pos
    leftPaddleY = mousePosY - (paddleHeight * 0.5);

    // right paddle pos
    const yGapOfRightPaddle = Math.abs((rightPaddleY + (paddleHeight * 0.5)) - ballPosY);


    if (rightPaddleY + 50 > ballPosY && yGapOfRightPaddle > paddleHeight * 0.2) {
      rightPaddleY -= 8;
    }

    if (rightPaddleY + 50 < ballPosY && yGapOfRightPaddle > paddleHeight * 0.2) {
      rightPaddleY += 8;
    }


    // ball pos
    ballPosX += ballMoveX;
    ballPosY += ballMoveY;
    // test if left paddle hit and then bounce otherwise resetBall()
    if (ballPosX < 0) {
      const deltaLeft = Math.abs((leftPaddleY + (paddleHeight * 0.5)) - ballPosY);
      if (betweenLeftPaddleVertically()) {
        ballMoveX *= -1;
        ballMoveY = deltaLeft * 0.3;
      } else {
        ballMissed('human');
      }
    }
    // test if right paddle hit and then bounce otherwise resetBall()
    if (ballPosX > w) {
      const deltaRight = Math.abs((rightPaddleY + (paddleHeight * 0.5)) - ballPosY);
      if (betweenRightPaddleVertically()) {
        ballMoveX *= -1;
        ballMoveY = deltaRight * 0.3;
      } else {
        ballMissed('bot');
      }
    }
    if (ballPosY < 0 && ballMoveY < 0.0) ballMoveY *= -1; // bounce in y direction
    if (ballPosY > h && ballMoveY > 0.0) ballMoveY *= -1; // bounce in y direction
  }

  function mousePos(e) {
    const rectangle = canvas.getBoundingClientRect();
    const root = document.documentElement;
    mousePosY = e.clientY - rectangle.top - root.scrollTop;
  }

  function betweenLeftPaddleVertically() {
    leftPaddleBottom = leftPaddleY + paddleHeight;
    return (ballPosY > leftPaddleY && ballPosY < leftPaddleBottom);
  }

  function betweenRightPaddleVertically() {
    rightPaddleBottom = rightPaddleY + paddleHeight;
    return (ballPosY > rightPaddleY && ballPosY < rightPaddleBottom);
  }

  function resetBall() {
    ballMoveX *= -1;
    ballPosX = w * 0.5;
  }

  function ballMissed(playerName) {
    if (playerName === 'human') humanScore++;
    else botScore++;

    gameIsOver = (humanScore >= 3 || botScore >= 3);
    leadPlayer = (humanScore < botScore) ? 'Human' : 'Bot';

    if (!gameIsOver) resetBall();
  }

  function restart() {
    if (gameIsOver) {
      gameIsOver = false;
      mousePosY = h * 0.5;
      leftPaddleY = (h * 0.5) - (paddleHeight * 0.5);
      leftPaddleBottom = leftPaddleY + paddleHeight;
      rightPaddleY = (h * 0.5) - (paddleHeight * 0.5);
      rightPaddleBottom = rightPaddleY + paddleHeight;
      ballPosX = w * 0.5;
      ballPosY = h * 0.5;
      ballMoveX = 10;
      ballMoveY = 10;
      humanScore = 0;
      botScore = 0;
      leadPlayer = null;
    }
  }
}

function paranoidCanvas() {
  const canvas = document.getElementById('paranoid-canvas');
  const context = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;

  let mousePosX = w * 0.5;
  let mousePosY = h * 0.5;

  const fps = 30;

  const colWidth = 80;
  const tileWidth = colWidth - 2;
  const rowHeight = 22;
  const tileHeight = rowHeight - 2;

  const paddleWidth = 100;
  const paddleHeight = 13;
  const paddleBottomOffset = 50;

  let paddleTop = null;
  let paddleRight = null;
  let paddleBottom = null;
  let paddleLeft = null;

  let ballPosX = w * 0.5;
  let ballPosY = h * 0.5;

  let ballMoveX = 10;
  let ballMoveY = -10;
  let prevBallPosX = null;
  let prevBallPosY = null;

  const numOfCols = Math.ceil(w / colWidth);
  const numOfRows = 10;
  const rowsTopOffset = 3;
  const numOfTiles = numOfCols * numOfRows;
  let tileNotHit = [];

  let ballMissed = 0;
  let gameIsOver = false;
  let scoreCardOn = true;

  events();
  resetTiles();
  setInterval(repeatCall, 1000 / fps);

  function repeatCall() {
    move();
    draw();
  }

  function events() {
    canvas.addEventListener('mousemove', mousePos);
    canvas.addEventListener('click', restart);
  }

  function draw() {
    rect(context, 0, 0, w, h, 'black'); // draw canvas
    if (!gameIsOver) {
      rect(context, paddleLeft, paddleTop,
        paddleWidth, paddleHeight, 'white'); // draw paddle

      // draw tiles
      for (let rowIndex = 0; rowIndex < numOfRows; rowIndex++) {
        for (let colIndex = 0; colIndex < numOfCols; colIndex++) {
          const tileToBeDrawn = (rowIndex * numOfCols) + colIndex;
          const cellX = colIndex * colWidth;
          const cellY = rowIndex * rowHeight;

          if (tileNotHit[tileToBeDrawn]) {
            rect(context, cellX, cellY, tileWidth, tileHeight, 'green');
          }

          // show tile numbers
          // text(context, tileToBeDrawn,
          //   cellX + 30, cellY + 15, 'rgba(255,255,255,0.2)');
        }
      }

      // draw ball
      arc(context, ballPosX, ballPosY, 10, 'yellow');

      // draw mouse coordinates
      const tileNowIn = tile(mousePosX, mousePosY);
      text(
        context,
        `${tileNowIn.col} : ${tileNowIn.row}, ${tileNowIn.num}`,
        mousePosX, mousePosY, 'pink'
      );

      // draw scores
      text(context, `Ball missed: ${ballMissed}`, 20, h - 25);
    } else {
      if (!tileRemaining()) {
        text(context, 'You won. Click to continue!', 100, 80, 'white');
        return;
      }
      text(context, 'You lost. Click to continue!', 100, 80, 'white');
    }
  }

  function mousePos(e) {
    const rectangle = canvas.getBoundingClientRect();
    const root = document.documentElement;

    mousePosX = e.clientX - rectangle.left - root.scrollTop;
    mousePosY = e.clientY - rectangle.top - root.scrollTop;

    // ballPosX = mousePosX;
    // ballPosY = mousePosY;
  }

  function move() {
    if (!gameIsOver) {
      // paddle pos
      paddlePos();

      // ball pos
      ballPosX += ballMoveX;
      ballPosY += ballMoveY;

      // ball reflect from paddle hit
      if (
        ballPosX > paddleLeft &&
        ballPosX < paddleRight &&
        ballPosY > paddleTop &&
        ballPosY < paddleBottom
      ) {
        const delta = (paddleLeft + (paddleWidth * 0.5)) - ballPosX;
        ballMoveY *= -1;
        ballMoveX = -delta * 0.3;
      }

      // bounce in x direction
      if (ballPosX < 0 + Math.abs(ballMoveX * 1.2) && ballMoveX < 0.0) ballMoveX *= -1;
      // bounce in x direction
      if (ballPosX > w - Math.abs(ballMoveX * 1.2) && ballMoveX > 0.0) ballMoveX *= -1;
      // bounce in y direction
      if (ballPosY < 0 + Math.abs(ballMoveY * 1.2) && ballMoveY < 0.0) ballMoveY *= -1;
      // bounce in y direction
      if (ballPosY > h) ballMoveY *= -1;

      // bounce in y direction
      if (ballPosY > paddleBottom && scoreCardOn) {
        ballMissed++;

        gameIsOver = (ballMissed >= 3);
        scoreCardOn = false;
      }
      if (ballPosY > h && !gameIsOver) {
        ballReset();
      }

      // ball reflect form tile hit
      const curTile = tile(ballPosX, ballPosY);
      const curTileNum = curTile.num;
      const curRow = curTile.row;
      const curCol = curTile.col;

      if (tileNotHit[curTileNum] && curCol >= 0 && curCol <= numOfCols - 1 && curRow >= 0) {
        tileNotHit[curTileNum] = false;

        if (!tileRemaining()) {
          gameIsOver = true;
        }

        const prevTile = tile(prevBallPosX, prevBallPosY);
        const prevTileNum = prevTile.num;
        const prevRow = prevTile.row;
        const prevCol = prevTile.col;

        const onlyColChanged = (prevRow === curRow && prevCol !== curCol);
        const onlyRowChanged = (prevRow !== curRow && prevCol === curCol);
        const bothChanged = (prevRow !== curRow && prevCol !== curCol);

        if (onlyColChanged) {
          reverse('x');
        } else if (onlyRowChanged) {
          reverse('y');
        } else if (bothChanged) {
          if (!tileNotHit[(prevBallPosY > ballPosY) ?
              prevTileNum - numOfCols : prevTileNum + numOfCols]) {
            reverse('x');
          }
          if (!tileNotHit[(prevBallPosX > ballPosX) ? prevTileNum - 1 : prevTileNum + 1]) {
            reverse('y');
          }
          if (
            tileNotHit[(prevBallPosY > ballPosY) ?
              prevTileNum - numOfCols : prevTileNum + numOfCols] &&
            tileNotHit[(prevBallPosX > ballPosX) ? prevTileNum - 1 : prevTileNum + 1]
          ) {
            reverse('x');
            reverse('y');
          }
        }
      }
      // end code, so that when this function will be called again, 
      // this data will remain as previous value as history.
      prevBallPosX = ballPosX;
      prevBallPosY = ballPosY;
    }
  }

  function reverse(direction) {
    if (direction === 'x') {
      ballMoveX *= -1;
    } else if (direction === 'y') {
      ballMoveY *= -1;
    } else if (direction === 'both') {
      ballMoveX *= -1;
      ballMoveY *= -1;
    }
  }

  function paddlePos() {
    paddleTop = h - paddleHeight - paddleBottomOffset;
    paddleLeft = mousePosX - (paddleWidth * 0.5);
    paddleBottom = paddleTop + paddleHeight;
    paddleRight = paddleLeft + paddleWidth;
  }

  function tile(x, y, col, row) {
    let tileCol;
    let tileRow;

    if (x && y) {
      tileCol = Math.floor(x / colWidth);
      tileRow = Math.floor(y / rowHeight);
    } else {
      tileCol = col;
      tileRow = row;
    }
    const num = (tileRow * numOfCols) + tileCol;

    return {
      col: tileCol,
      row: tileRow,
      num
    };
  }

  function ballReset() {
    ballPosY = h * 0.5;
    scoreCardOn = true;
  }

  function resetTiles() {
    for (let i = 0; i < numOfTiles; i++) {
      if (i < rowsTopOffset * numOfCols) {
        tileNotHit.push(false);
      } else {
        tileNotHit.push(true);
      }
    }
  }

  function tileRemaining() {
    return tileNotHit.some(el => el === true);
  }

  function restart() {
    if (gameIsOver) {
      mousePosX = w * 0.5;
      mousePosY = h * 0.5;

      paddleTop = null;
      paddleRight = null;
      paddleBottom = null;
      paddleLeft = null;

      ballPosX = w * 0.5;
      ballPosY = h * 0.5;
      ballMoveX = 10;
      ballMoveY = 10;
      prevBallPosX = null;
      prevBallPosY = null;

      tileNotHit = [];

      ballMissed = 0;
      gameIsOver = false;
      scoreCardOn = true;

      resetTiles();
    }
  }
}
