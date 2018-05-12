import {
  rect,
  arc,
  text
} from './Drawings';

function tennisCanvas() {
  const canvas = document.getElementById('tennis-canvas');
  const context = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;

  const fps = 30;
  let gameIsOver = true;

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
      text(context, `Bot missed: ${botScore}`, w - 210, 100, 'white');
      arc(context, ballPosX, ballPosY, 10, 'yellow');
    } else {
      if (leadPlayer) {
        text(context, `${leadPlayer} won`, 100, 100, 'white');
      }
      text(context, 'Click to continue', w - 240, 100, 'white');
    }
  }

  function move() {
    if (!gameIsOver) {
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
  }

  function mousePos(e) {
    const rectangle = canvas.getBoundingClientRect();
    const root = document.documentElement;
    mousePosY = e.clientY - rectangle.top; // - root.scrollTop;
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

export default tennisCanvas;
