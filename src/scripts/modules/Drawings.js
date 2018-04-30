export const rect = (ctx, x, y, w, h, c) => {
  const context = ctx;
  context.fillStyle = c;
  context.fillRect(x, y, w, h);
};

export const arc = (ctx, x, y, r, c) => {
  const context = ctx;
  context.fillStyle = c;
  context.beginPath();
  context.arc(x, y, r, 0, Math.PI * 2, false);
  context.fill();
};

export const text = (ctx, txt, x, y, color) => {
  const context = ctx;
  context.fillStyle = color;
  context.fillText(txt, x, y);
};
