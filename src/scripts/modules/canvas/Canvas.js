import tennisCanvas from './tennisCanvas';
import paranoidCanvas from './paranoidCanvas';
import racingCanvas from './racingCanvas/racingCanvas';
import wander from './wander/wanderCanvas';
import snowfallCanvas from './snowfall/snowfallCanvas';
import patATap from './patATap/patATap';

export const initCanvas = () => {
  tennisCanvas();
  paranoidCanvas();
  racingCanvas();
  wander();
  snowfallCanvas();
  patATap();
};
