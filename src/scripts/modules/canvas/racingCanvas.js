import {
  rect,
  text,
  drawBitmapCenteredWithRotation
} from './Drawings';

function racingCanvas() {
  const canvas = document.getElementById('racing-canvas');
  const context = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;
  const KEY_LEFT_ARROW = 37;
  const KEY_RIGHT_ARROW = 39;
  const KEY_UP_ARROW = 38;
  const KEY_DOWN_ARROW = 40;
  const TRACK_ROAD = 0;
  const TRACK_WALL = 1;
  const TRACK_PLAYER_START = 2;
  const TRACK_GOAL = 3;
  const TRACK_TREE = 4;
  const TRACK_FLAG = 5;
  let keyHeldGas = false;
  let keyHeldReverse = false;
  let keyHeldTurnLeft = false;
  let keyHeldTurnRight = false;
  const fps = 30;
  const colWidth = 40;
  const tileWidth = colWidth;
  const rowHeight = 40;
  const tileHeight = rowHeight;
  let carPosX = w * 0.5;
  let carPosY = h * 0.5;
  let carAngle = 0;
  let carMove = 0;
  const GROUND_SPEED_DECAY_MULTIPLIER = 0.94;
  const DRIVE_POWER = 0.5;
  const REVERSE_POWER = 0.2;
  const TURN_RATE = 0.06;
  const MIN_SPEED_TO_TURN = 0.5;
  const numOfCols = Math.ceil(w / colWidth);
  const numOfRows = Math.ceil(h / rowHeight);
  let tileNotHit = [];
  let gameIsOver = false;
  const carPic = document.createElement('img');
  const trackPics = [];
  let picturesToLoad = 0;

  rect(context, 0, 0, w, h, 'green');
  text(context, 'Loading Images...', (w * 0.5) - 50, h * 0.5, 'white');

  events();
  loadImages();

  function events() {
    canvas.addEventListener('click', restart);
    document.addEventListener('keydown', keyPressed);
    document.addEventListener('keyup', keyReleased);
  }

  function launchIfAllPicsLoaded() {
    picturesToLoad--;

    if (picturesToLoad === 0) {
      imageLoadingDoneSoStartGame();
    }
  }

  function imageLoadingDoneSoStartGame() {
    resetTiles();
    resetCar();
    setInterval(repeatCall, 1000 / fps);
  }

  function repeatCall() {
    move();
    draw();
  }

  function loadImages() {
    // const dataSet = {
    //   varName: carPic,
    //   filePath: '../img/car.png'
    // };

    const imageList = [{
        varName: carPic,
        filePath: '../img/car.png'
      },
      {
        trackType: TRACK_WALL,
        filePath: '../img/tile.png'
      },
      {
        trackType: TRACK_ROAD,
        filePath: '../img/road.png'
      },
      {
        trackType: TRACK_GOAL,
        filePath: '../img/goal.png'
      },
      {
        trackType: TRACK_TREE,
        filePath: '../img/tree.png'
      },
      {
        trackType: TRACK_FLAG,
        filePath: '../img/flag.png'
      },
    ];

    picturesToLoad = imageList.length;

    for (let i = 0; i < imageList.length; i++) {
      if (imageList[i].varName !== undefined) {
        beginLoadingImage(imageList[i].varName, imageList[i].filePath);
      } else {
        loadImageForTrackCode(imageList[i].trackType, imageList[i].filePath);
      }
    }
  }

  function loadImageForTrackCode(trackCode, filePath) {
    trackPics[trackCode] = document.createElement('img');
    beginLoadingImage(trackPics[trackCode], filePath);
  }

  function beginLoadingImage(imgVar, filePath) {
    const imgTag = imgVar;
    imgTag.addEventListener('load', launchIfAllPicsLoaded);
    imgTag.src = filePath;
  }

  function keyPressed(evt) {
    evt.preventDefault();
    if (evt.keyCode === KEY_UP_ARROW) {
      keyHeldGas = true;
    }
    if (evt.keyCode === KEY_DOWN_ARROW) {
      keyHeldReverse = true;
    }
    if (evt.keyCode === KEY_LEFT_ARROW) {
      keyHeldTurnLeft = true;
    }
    if (evt.keyCode === KEY_RIGHT_ARROW) {
      keyHeldTurnRight = true;
    }
  }

  function keyReleased(evt) {
    evt.preventDefault();
    if (evt.keyCode === KEY_UP_ARROW) {
      keyHeldGas = false;
    }
    if (evt.keyCode === KEY_DOWN_ARROW) {
      keyHeldReverse = false;
    }
    if (evt.keyCode === KEY_LEFT_ARROW) {
      keyHeldTurnLeft = false;
    }
    if (evt.keyCode === KEY_RIGHT_ARROW) {
      keyHeldTurnRight = false;
    }
  }

  function draw() {
    if (!gameIsOver) {
      // draw tiles

      let tileToBeDrawn = 0;
      let cellY = 0;
      let cellX = 0;

      for (let rowIndex = 0; rowIndex < numOfRows; rowIndex++) {
        for (let colIndex = 0; colIndex < numOfCols; colIndex++) {
          context.drawImage(trackPics[tileNotHit[tileToBeDrawn]], cellX, cellY);

          cellX += colWidth;
          tileToBeDrawn++;
        }
        cellY += rowHeight;
        cellX = 0;
      }
    }
    drawBitmapCenteredWithRotation(context, carPic, carPosX, carPosY, carAngle);
  }

  function move() {
    carMovement();
  }

  function carMovement() {
    if (!gameIsOver) {
      // car pos
      carMove *= GROUND_SPEED_DECAY_MULTIPLIER;

      if (keyHeldGas) carMove += DRIVE_POWER;
      if (keyHeldReverse) carMove -= REVERSE_POWER;

      if (Math.abs(carMove) > MIN_SPEED_TO_TURN) {
        if (keyHeldTurnRight) carAngle += TURN_RATE;
        if (keyHeldTurnLeft) carAngle -= TURN_RATE;
      }

      carPosX += Math.cos(carAngle) * carMove;
      carPosY += Math.sin(carAngle) * carMove;

      // car reflect form tile hit
      const curTile = tile(carPosX, carPosY);
      const curTileNum = curTile.num;
      const curRow = curTile.row;
      const curCol = curTile.col;
      if (tileNotHit[curTileNum] && curCol >= 0 && curCol <= numOfCols - 1 && curRow >= 0) {
        carPosX -= Math.cos(carAngle) * carMove;
        carPosY -= Math.sin(carAngle) * carMove;
        carMove *= -0.5;
      }
    }
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

  function resetTiles() {
    tileNotHit = [
      4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4,
      4, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
      4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
      1, 0, 0, 0, 1, 1, 1, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 1,
      1, 0, 0, 1, 1, 0, 0, 1, 4, 4, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1,
      1, 0, 0, 1, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
      1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 5, 0, 0, 1, 0, 0, 1,
      1, 0, 0, 1, 0, 0, 5, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
      1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 5, 0, 0, 1, 0, 0, 1, 0, 0, 1,
      1, 0, 2, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 5, 0, 0, 1,
      1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
      1, 0, 3, 0, 0, 0, 1, 4, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
      1, 0, 3, 0, 0, 0, 1, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 4
    ];
  }

  function restart() {
    if (gameIsOver) {
      carPosX = w * 0.5;
      carPosY = h * 0.5;
      carMove = 2;
      tileNotHit = [];
      gameIsOver = false;
      resetTiles();
      resetCar();
    }
  }

  function resetCar() {
    for (let rowIndex = 0; rowIndex < numOfRows; rowIndex++) {
      for (let colIndex = 0; colIndex < numOfCols; colIndex++) {
        const tileToBeDrawn = (rowIndex * numOfCols) + colIndex;
        const cellX = colIndex * colWidth;
        const cellY = rowIndex * rowHeight;
        // draw car
        if (tileNotHit[tileToBeDrawn] === TRACK_PLAYER_START) {
          tileNotHit[tileToBeDrawn] = TRACK_ROAD;
          carAngle = -Math.PI / 2;
          carPosX = cellX + (tileWidth * 0.5);
          carPosY = cellY + (tileHeight * 0.5);
        }
      }
    }
  }
}

export default racingCanvas;
