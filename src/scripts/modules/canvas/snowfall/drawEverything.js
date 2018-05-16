import { rect, arc, text } from '../Drawings';

const drawEverything = $ => {
  rect($.context, 0, 0, $.w, $.h, 'black');

  // Draw balls
  $.ballsArr.forEach(ball => {
    arc($.context, ball.x, ball.y, ball.radius, 'white');
  });

  // Draw tiles
  if ($.layout.indexOf(1) !== -1) {
    let tileToBeDrawn = 0;
    let cellX = 0;
    let cellY = 0;
    for (let rowIndex = 0; rowIndex < $.numOfRows; rowIndex++) {
      for (let colIndex = 0; colIndex < $.numOfCols; colIndex++) {
        if ($.layout[tileToBeDrawn]) {
          rect(
            $.context,
            cellX,
            cellY,
            $.colWidth - 1,
            $.rowHeight - 1,
            'orange'
          );
        }
        cellX += $.colWidth;
        tileToBeDrawn++;
      }
      cellY += $.rowHeight;
      cellX = 0;
    }
  }

  // label of start / stop
  rect($.context, 5, $.context.canvas.height - 35, 70, 30, 'rgba(0,55,0,0.9)');
  text(
    $.context,
    $.ballsAreRunning ? 'Stop' : 'Start',
    40,
    $.context.canvas.height - 13,
    'white',
    undefined,
    'center'
  );

  // label of reset
  rect(
    $.context,
    85,
    $.context.canvas.height - 35,
    70,
    30,
    'rgba(20,100,200,0.9)'
  );
  text(
    $.context,
    'Reset',
    120,
    $.context.canvas.height - 13,
    'white',
    undefined,
    'center'
  );

  // label of Destroy
  rect(
    $.context,
    165,
    $.context.canvas.height - 35,
    70,
    30,
    'rgba(150,0,0,0.9)'
  );
  text(
    $.context,
    'Destroy',
    200,
    $.context.canvas.height - 14,
    'white',
    '14pt',
    'center'
  );

  // rectangle box for num of balls input
  rect(
    $.context,
    $.context.canvas.width - 75,
    $.context.canvas.height - 35,
    70,
    30,
    'rgba(150,0,0,0.9)'
  );
  text(
    $.context,
    `Balls: ${$.numOfBalls}`,
    $.context.canvas.width - 40,
    $.context.canvas.height - 14,
    'white',
    '11pt',
    'center'
  );

  // show mouse coords below cursor for dev support
  // const getMouse = tile($, undefined, undefined, true);
  // text(
  //   $.context,
  //   `${$.mX}, ${$.mY}, ${getMouse.i}, ${$.layout[getMouse.i]}`,
  //   $.mX,
  //   $.mY + 30,
  //   'white',
  //   '8pt'
  // );
};

export default drawEverything;
