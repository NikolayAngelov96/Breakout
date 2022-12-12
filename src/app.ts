import { Ball } from "./Ball";
import { Brick } from "./Brick";
import { Paddle } from "./Paddle";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

export const HEIGHT = canvas.height;
export const WIDTH = canvas.width;

let dx = 1.5;
let dy = 2;

const ball = new Ball(ctx);
const paddle = new Paddle(ctx);
let bricks = generateBricks();

canvas.addEventListener("mousemove", (e) => {
  if (e.offsetX > 0 && e.offsetX < WIDTH) {
    paddle.move(e.offsetX);
  }
});

render();

function render() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  ball.draw();
  checkIsBallColliding(ball);
  ball.x += dx;
  ball.y += dy;

  paddle.draw();

  bricks = bricks.filter((x) => x.isHitted == false);
  for (const brick of bricks) {
    if (brick.isHitted == false) {
      brick.draw();
    }
  }

  detectCollision(ball);

  requestAnimationFrame(render);
}

function checkIsBallColliding(ball: Ball) {
  if (ball.x + dx > WIDTH - ball.radius || ball.x + dx < ball.radius) {
    dx = -dx;
  }

  if (ball.y + dy < ball.radius) {
    dy = -dy;
  } else if (ball.y + dy > HEIGHT - ball.radius) {
    if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
      dy = -dy;
    } else {
      alert("Game Over");
      document.location.reload();
    }
  }
}

function generateBricks() {
  let bricks: Brick[] = [];
  let brickWidth = 75;
  let brickHeight = 20;

  let brickPadding = 10;
  let brickOffset = 30;

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 5; col++) {
      let brickX = col * (brickWidth + brickPadding) + brickOffset;
      let brickY = row * (brickHeight + brickPadding) + brickOffset;

      bricks.push(new Brick(ctx, brickX, brickY, 75, 20));
    }
  }

  return bricks;
}

function detectCollision(ball: Ball) {
  for (const brick of bricks) {
    if (
      ball.x > brick.x &&
      ball.x < brick.x + brick.width &&
      ball.y > brick.y &&
      ball.y < brick.y + brick.height
    ) {
      dy = -dy;
      brick.isHitted = true;
    }
  }
}

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

function drawBall() {
  ctx.beginPath();
  ctx.arc(50, 50, 10, 0, 2 * Math.PI);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}
