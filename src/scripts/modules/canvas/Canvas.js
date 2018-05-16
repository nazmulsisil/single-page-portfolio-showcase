import tennisCanvas from './tennisCanvas';
import paranoidCanvas from './paranoidCanvas';
import racingCanvas from './racingCanvas/racingCanvas';
import wander from './wander/wanderCanvas';
import snowfallCanvas from './snowfall/snowfallCanvas';

export const initCanvas = () => {
  tennisCanvas();
  paranoidCanvas();
  racingCanvas();
  wander();
  snowfallCanvas();
};
