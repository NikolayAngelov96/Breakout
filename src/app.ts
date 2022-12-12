const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

const HEIGHT = canvas.height;
const WIDTH = canvas.width;

grid();

function grid() {
  const minorGridStyle = "rgba(0, 0, 0, 0.2)";
  const majorGridStyle = "rgba(0, 0, 0, 0.5)";

  ctx.save();
  ctx.lineWidth = 1;

  for (let x = 20; x < WIDTH; x += 20) {
    ctx.strokeStyle = x % 100 == 0 ? majorGridStyle : minorGridStyle;

    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, HEIGHT);
    ctx.stroke();
    ctx.closePath();
  }

  for (let y = 20; y < HEIGHT; y += 20) {
    ctx.strokeStyle = y % 100 == 0 ? majorGridStyle : minorGridStyle;

    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(WIDTH, y);
    ctx.stroke();
    ctx.closePath();
  }

  ctx.restore();
}
