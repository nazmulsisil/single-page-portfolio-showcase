import { inFocus } from './globalHelper';

const events = () => {
  const containers = document.getElementsByClassName('container');

  window.addEventListener('scroll', () => {
    Array.from(containers).forEach(el => {
      inFocus(el);
    });
  });
};

export default events;
