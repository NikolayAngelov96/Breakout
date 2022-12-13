import { Ball } from "./Ball";
import { Brick } from "./Brick";
import { Paddle } from "./Paddle";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

let alive = true;
let lives = 3;
let score = 0;
const brickRowCount = 3;
const brickColumnCount = 5;

export const HEIGHT = canvas.height;
export const WIDTH = canvas.width;

let x = canvas.width / 2;
let y = canvas.height - 30;

const speed = 2;
const vel = {
  x: speed,
  y: speed * 1.5,
};

const ball = new Ball(ctx, x, y, vel);
const paddle = new Paddle(ctx, (canvas.width - 150) / 2);
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
  ball.move();

  paddle.draw();
  drawLives();
  drawScore();

  bricks = bricks.filter((x) => x.isHitted == false);
  for (const brick of bricks) {
    if (brick.isHitted == false) {
      brick.draw();
    }
  }

  checkCollisionWithBricks(ball);

  if (alive) {
    requestAnimationFrame(render);
  }
}

function checkIsBallColliding(ball: Ball) {
  if (ball.x + vel.x > WIDTH - ball.radius || ball.x + vel.x < ball.radius) {
    vel.x = -vel.x;
  }

  if (ball.y + vel.y < ball.radius) {
    vel.y = -vel.y;
  } else if (ball.y + vel.y > HEIGHT - ball.radius - paddle.height - 10) {
    if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
      vel.y = -vel.y;
      let centerOfPaddleX = paddle.x + paddle.width / 2;
      let ballDistFromPaddleCenterX = ball.x - centerOfPaddleX;
      vel.x = ballDistFromPaddleCenterX * 0.05;
    } else {
      if (ball.y + vel.y > HEIGHT - ball.radius) {
        lives--;
        if (!lives) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.font = "24px Arial";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
          alive = false;
        } else {
          ball.x = canvas.width / 2;
          ball.y = canvas.height - 30;
          vel.x = 2;
          vel.y = -2;
          paddle.x = (canvas.width - paddle.width) / 2;
        }
      }
    }
  }
}

function generateBricks() {
  let bricks: Brick[] = [];
  const brickWidth = 175;
  const brickHeight = 20;

  const brickPadding = 10;
  const brickOffsetTop = 70;
  const brickOffsetLeft = 30;

  for (let row = 0; row < brickRowCount; row++) {
    for (let col = 0; col < brickColumnCount; col++) {
      let brickX = col * (brickWidth + brickPadding) + brickOffsetLeft;
      let brickY = row * (brickHeight + brickPadding) + brickOffsetTop;

      bricks.push(new Brick(ctx, brickX, brickY, 75, 20));
    }
  }

  return bricks;
}

function checkCollisionWithBricks(ball: Ball) {
  for (const brick of bricks) {
    if (
      ball.x > brick.x &&
      ball.x < brick.x + brick.width &&
      ball.y + ball.radius > brick.y &&
      ball.y - ball.radius < brick.y + brick.height
    ) {
      vel.y = -vel.y;
      brick.isHitted = true;
      score++;
      if (score === brickColumnCount * brickRowCount) {
        alive = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "24px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("You WIN", canvas.width / 2, canvas.height / 2);
      }
    }
  }
}

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText(`Score: ${score}`, 8, 20);
}

function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
}
