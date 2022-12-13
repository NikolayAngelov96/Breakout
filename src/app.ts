import { Ball } from "./Ball";
import { generateBricks, levelScore } from "./levels";
import { Paddle } from "./Paddle";
import { Scoreboard } from "./Scoreboard";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

canvas.style.cursor = "none";

let alive = true;

let level = 1;

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

document.addEventListener("mousemove", (e) => {
  const relativeX = e.clientX - canvas.offsetLeft;

  if (
    relativeX > paddle.width / 2 &&
    relativeX < canvas.width - paddle.width / 2
  ) {
    paddle.x = relativeX - paddle.width / 2;
  }
});

render();

function render() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  ball.draw();
  paddle.draw();
  ball.move();

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
        (vel.x = speed),
          (vel.y = speed * 1.5),
          (bricks = generateBricks(ctx, level));
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
        canvas.style.cursor = "default";
        alive = false;
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
    if (brick.isHitted == false) {
      brick.draw();
    }
  }

  if (alive) {
    requestAnimationFrame(render);
  }
}
