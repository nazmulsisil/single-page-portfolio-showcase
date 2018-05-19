export const getPosition = domElement => ({
  top: domElement.getBoundingClientRect().top,
  right: domElement.getBoundingClientRect().right,
  bottom: domElement.getBoundingClientRect().bottom,
  left: domElement.getBoundingClientRect().left
});
