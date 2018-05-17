export const events = $ => {
  $.canvas.addEventListener('click', () => {
    $.started = true;
  });
};
