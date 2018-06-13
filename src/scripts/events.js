import { inFocus, shouldHeadingAppear, noSmallScreen } from './globalHelper';

const events = () => {
  const containers = document.getElementsByClassName('container');

  window.addEventListener('load', () => {
    noSmallScreen();
    shouldHeadingAppear();
  });

  window.addEventListener('resize', () => {
    noSmallScreen();
    shouldHeadingAppear();
  });

  window.addEventListener('scroll', () => {
    Array.from(containers).forEach(el => {
      inFocus(el);
    });
  });
};

export default events;
