import { Ball } from "./Ball";
import { Brick } from "./Brick";
import { Paddle } from "./Paddle";
import { Scoreboard } from "./Scoreboard";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

canvas.style.cursor = 'none';

let alive = true;
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
const scoreboard = new Scoreboard(ctx, {score: 0, lives: 3});

let bricks = generateBricks();

document.addEventListener("mousemove", (e) => {
  const relativeX = e.clientX - canvas.offsetLeft;

  if (relativeX > paddle.width / 2 && relativeX < canvas.width - paddle.width / 2) {
      paddle.x = relativeX - paddle.width / 2;
  }
});

render();

function render() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  ball.draw();
  checkIsBallColliding(ball);
  ball.move();

  paddle.draw();

  scoreboard.showStats();

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
        scoreboard.loseLife();
        if (!scoreboard.lives) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.font = "48px Arial";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
          canvas.style.cursor = 'default';
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

  const brickPadding = 8;
  const brickOffsetTop = 70;
  const brickOffsetLeft = 30;

  for (let row = 0; row < brickRowCount; row++) {
    for (let col = 0; col < brickColumnCount; col++) {
      let brickX = (col * (brickWidth + brickPadding)) + brickOffsetLeft;
      let brickY = (row * (brickHeight + brickPadding)) + brickOffsetTop;
      if (row == 0) {
        bricks.push(new Brick(ctx, brickX, brickY, brickWidth, brickHeight, 3));
      } else if (row == 1) {
        bricks.push(new Brick(ctx, brickX, brickY, brickWidth, brickHeight, 2));
      } else if (row == 2) {
        bricks.push(new Brick(ctx, brickX, brickY, brickWidth, brickHeight, 1));
      }
      
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

      brick.density--;
      if (brick.density == 0) {
        brick.isHitted = true;
      }

      scoreboard.incrementScore();

      // if (scoreboard.score === brickColumnCount * brickRowCount) {
      if (scoreboard.score === 30) {
        alive = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "24px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("You WIN", canvas.width / 2, canvas.height / 2);
        canvas.style.cursor = 'default';
      }
    }
  }
}