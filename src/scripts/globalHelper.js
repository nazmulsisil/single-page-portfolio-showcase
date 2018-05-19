export const getPosition = domElement => ({
  top: domElement.getBoundingClientRect().top,
  right: domElement.getBoundingClientRect().right,
  bottom: domElement.getBoundingClientRect().bottom,
  left: domElement.getBoundingClientRect().left
});

export const inFocus = whichEl => {
  const elmPos = getPosition(whichEl);
  const currentElId = whichEl.id;
  const elInFocus = document.querySelectorAll(`[data-todel=${currentElId}]`)[0];

  if (
    getCssTransformValue(whichEl) === 'none' &&
    elmPos.top > -whichEl.offsetHeight * 0.5 &&
    elmPos.top < window.innerHeight * 0.5
  ) {
    elInFocus.classList.add('list__item--in-view');
    return true;
  }

  elInFocus.classList.remove('list__item--in-view');
  return false;
};

export const getCssTransformValue = whichElementsCss => {
  const style = window.getComputedStyle(whichElementsCss);
  return style.getPropertyValue('transform');
};

export const getInFocusMark = () => {
  const containersArr = Array.from(
    document.getElementsByClassName('container')
  );
  containersArr.forEach(el => inFocus(el));
};
