import { inFocus, shouldHeadingAppear } from './globalHelper';

const events = () => {
  const containers = document.getElementsByClassName('container');

  window.addEventListener('load', () => {
    shouldHeadingAppear();
  });

  window.addEventListener('resize', () => {
    shouldHeadingAppear();
  });

  window.addEventListener('scroll', () => {
    Array.from(containers).forEach(el => {
      inFocus(el);
    });
  });
};

export default events;
