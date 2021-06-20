/**
 * @type HTMLCanvasElement
 */
const canvas = document.getElementById('canvas');
const padding = 10;
const canvasWidth = (canvas.width = 1024);
const canvasHeight = (canvas.height = 576);
const CANVAS = {
  left: padding,
  top: padding,
  right: canvasWidth - padding,
  bottom: canvasHeight - padding,
};
const ctx = canvas.getContext('2d');

async function drawImage(src, { x, y, width, height }) {
  return new Promise((resolve) => {
    const image = new Image();
    image.src = src;
    image.onload = function () {
      if (width && height) {
        resolve(ctx.drawImage(image, x, y, width, height));
      } else {
        resolve(ctx.drawImage(image, x, y));
      }
    };
  });
}

function drawRect(x, y, width, height) {
  ctx.fillStyle = '#28282899';
  ctx.fillRect(x, y, width, height);
}

/**
 * 圆角矩形
 * @param {number} x x
 * @param {number} y y
 * @param {number} w width
 * @param {number} h height
 * @param {number} r radius
 */
function drawRoundRect(x, y, w, h, r) {
  ctx.fillStyle = '#28282899';
  const min_size = Math.min(w, h);
  if (r > min_size / 2) r = min_size / 2;
  // 开始绘制
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  ctx.fill();
}

function drawText(text, x, y, fontSize = 14, fontWeight = 'normal', hasStroke) {
  ctx.beginPath();
  ctx.fillStyle = '#fffffff0';
  ctx.font = `${fontWeight} ${fontSize}px sans-serif`;
  ctx.fillText(text, x, y);
  if (hasStroke) {
    ctx.strokeStyle = '#999';
    ctx.lineWidth = 1.5;
    ctx.strokeText(text, x, y);
  }
  ctx.closePath();
}

function savePng(id, fileName) {
  var canvasElement = document.getElementById(id);

  var MIME_TYPE = 'image/png';

  var imgURL = canvasElement.toDataURL(MIME_TYPE);

  var dlLink = document.createElement('a');
  dlLink.download = fileName;
  dlLink.href = imgURL;
  dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(
    ':'
  );

  document.body.appendChild(dlLink);
  dlLink.click();
  document.body.removeChild(dlLink);
}

async function render(config) {
  await drawImage('img/background.png', { x: 0, y: 0 });

  drawText(
    config.englishName,
    CANVAS.left,
    CANVAS.bottom - 186,
    36,
    'bold',
    true
  );
  drawText(config.name, CANVAS.left, CANVAS.bottom - 120, 70, 'bold', true);

  drawRect(CANVAS.left, CANVAS.bottom - 100, 100, 100, true);
  await drawImage('img/zhongzhuang.svg', {
    x: CANVAS.left + 10,
    y: CANVAS.bottom - 90,
    width: 85,
    height: 85,
  });

  drawRoundRect(CANVAS.left + 110, CANVAS.bottom - 100, 150, 100, 3);
  drawText('攻击范围', CANVAS.left + 152, CANVAS.bottom - 10);
  drawRoundRect(CANVAS.left + 270, CANVAS.bottom - 100, 150, 40, 3);
  drawText('远程位', CANVAS.left + 320, CANVAS.bottom - 75);
  drawRoundRect(CANVAS.left + 270, CANVAS.bottom - 55, 150, 55, 3);
  drawText('输出', CANVAS.left + 326, CANVAS.bottom - 30);
}

async function setup() {
  await render({
    englishName: 'Exusiai',
    name: '能天使',
    position: '远程位',
  });

  document.getElementById('save').onclick = function () {
    savePng('canvas', 'test');
  };
  document.getElementById('ok').onclick = async function () {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    await render({
      englishName: document.getElementById('englishName').value,
      name: document.getElementById('name').value,
      position: '远程位',
    });
  };
}

setup();
