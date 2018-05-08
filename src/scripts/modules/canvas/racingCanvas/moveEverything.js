export const moveEverything = () => {
  let keyHeldGas = false;
  let keyHeldReverse = false;
  let keyHeldTurnLeft = false;
  let keyHeldTurnRight = false;

  document.addEventListener('keydown', keyPressed);
  // document.addEventListener('keyup', keyReleased);

  function keyPressed(evt) {
    evt.preventDefault();
    const pressedOnKey = evt.keyCode;

    console.log(pressedOnKey);
  }

  if (keyHeldGas === true) {

  }
};
