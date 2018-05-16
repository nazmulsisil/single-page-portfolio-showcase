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

export const text = (
  ctx,
  txt,
  x,
  y,
  color,
  fontSize = '16pt',
  align = 'left',
  weight = 'normal'
) => {
  const context = ctx;
  context.save();
  context.fillStyle = color;
  context.textAlign = align;
  context.font = `italic ${weight} ${fontSize} Calibri`;
  context.fillText(txt, x, y);
  context.restore();
};

export const drawBitmapCenteredWithRotation = (ctx, img, x, y, withAngle) => {
  const context = ctx;
  context.save();
  context.translate(x, y);
  context.rotate(withAngle);
  context.drawImage(img, -(img.width * 0.5), -(img.height * 0.5));
  context.restore();
};
