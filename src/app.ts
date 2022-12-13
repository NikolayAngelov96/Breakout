import { Ball } from "./Ball";
import { generateBricks, levelScore } from "./levels";
import { Paddle } from "./Paddle";
import { Scoreboard } from "./Scoreboard";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

canvas.style.cursor = "none";

let alive = true;
let level = 1;
let rightPressed = false;
let leftPressed = false;

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
const scoreboard = new Scoreboard(ctx, { score: 0, lives: 3 });

let bricks = generateBricks(ctx, level);

document.addEventListener("mousemove", mouseMoveHandler);
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

render();

function render() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  ball.draw();
  paddle.draw();
  ball.move();

  if (rightPressed) {
    paddle.x = Math.min(paddle.x + 5, canvas.width - paddle.width);
  } else if (leftPressed) {
    paddle.x = Math.max(paddle.x - 5, 0);
  }

  ball.checkForCollisionWithPerimeter();

  if (ball.hasCollidedWithPaddle(paddle)) {
    ball.collide(paddle);
  }

  const indexOfBrick = ball.indexOfCollidedBrick(bricks);

  if (indexOfBrick != -1) {
    ball.collide(bricks[indexOfBrick]);

    scoreboard.incrementScore();

    if (scoreboard.score === levelScore[level]) {
      alive = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = "24px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("You WIN", canvas.width / 2, canvas.height / 2);
      // canvas.style.cursor = 'default';
      level++;
      setTimeout(() => {
        alive = true;
        scoreboard.score = 0;
        ball.x = canvas.width / 2;
        ball.y = canvas.height - 30;
        vel.x = speed;
        vel.y = speed * 1.5;
        paddle.x = (canvas.width - paddle.width) / 2;
        bricks = generateBricks(ctx, level);

        render();
      }, 1500);
    }
  } else {
    if (ball.y + vel.y > HEIGHT - ball.radius) {
      scoreboard.loseLife();
      if (!scoreboard.lives) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "48px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
        ctx.fillRect(canvas.width / 2 - 100, canvas.height / 2 + 50, 200, 50);
        ctx.font = "24px Arial";
        ctx.fillStyle = "black";
        ctx.fillText("Play Again", canvas.width / 2, canvas.height / 2 + 75);
        canvas.style.cursor = "default";
        alive = false;

        canvas.addEventListener("click", (e) => {
          const positions = {
            x: e.offsetX,
            y: e.offsetY,
          };

          if (
            positions.x >= canvas.width / 2 - 100 &&
            positions.x < canvas.width / 2 - 100 + 200 &&
            positions.y >= canvas.height / 2 + 50 &&
            positions.y < canvas.height / 2 + 50 + 50
          ) {
            restartGame();
          }
        });
      } else {
        ball.x = canvas.width / 2;
        ball.y = canvas.height - 30;
        // vel.x = 2;
        // vel.y = -2;
        paddle.x = (canvas.width - paddle.width) / 2;
      }
    }
  }

  scoreboard.showStats();

  bricks = bricks.filter((x) => x.isHitted == false);

  for (const brick of bricks) {
    brick.draw();
  }

  if (alive) {
    requestAnimationFrame(render);
  }
}

export function mouseMoveHandler(e: MouseEvent) {
  const relativeX = e.clientX - canvas.offsetLeft;

  if (
    relativeX > paddle.width / 2 &&
    relativeX < canvas.width - paddle.width / 2
  ) {
    paddle.x = relativeX - paddle.width / 2;
  }
}

function keyDownHandler(e: KeyboardEvent) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
  }
}

function keyUpHandler(e: KeyboardEvent) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
  }
}

function restartGame() {
  alive = true;
  scoreboard.lives = 3;
  scoreboard.score = 0;
  ball.x = canvas.width / 2;
  ball.y = canvas.height - 30;
  vel.x = speed;
  vel.y = speed * 1.5;
  paddle.x = (canvas.width - paddle.width) / 2;
  bricks = generateBricks(ctx, level);

  render();
}
