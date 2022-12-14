import { Ball } from "./Ball";
import { Canvas } from "./Canvas";
import { generateBricks, levelScore } from "./levels";
import { Paddle } from "./Paddle";
import { Scoreboard } from "./Scoreboard";

const canvasElement = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvasElement.getContext("2d");

canvasElement.style.cursor = "none";

let alive = true;
let level = 1;
let rightPressed = false;
let leftPressed = false;

export const HEIGHT = canvasElement.height;
export const WIDTH = canvasElement.width;

let x = WIDTH / 2;
let y = HEIGHT - 40;

const speed = 3;
const vel = {
  x: speed,
  y: speed * 1.5,
};

const canvas = new Canvas(canvasElement);
let ball = new Ball(ctx, x, y, vel);
const paddle = new Paddle(ctx, (WIDTH - 150) / 2);
const scoreboard = new Scoreboard(ctx, { score: 0, lives: 3 });

let bricks = generateBricks(ctx, level);

let lastTime = 0;
let delta = 0;

document.addEventListener("mousemove", mouseMoveHandler);
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

render(performance.now());

function render(time = 0) {
  delta += time - lastTime;
  lastTime = time;
  
  canvas.clear();
  ball.draw();
  paddle.draw();

  if (delta > 1000) {
    delta = 20;
  }

  while (delta > 20) {
    delta -= 20;

    ball.checkForCollisionWithPerimeter();

    if (ball.hasCollidedWithPaddle(paddle)) {
      ball.collide(paddle);
    }
  }

  const indexOfBrick = ball.indexOfCollidedBrick(bricks);
  
    if (indexOfBrick != -1) {
      ball.collide(bricks[indexOfBrick]);
  
      scoreboard.incrementScore();
  
      if (scoreboard.score === levelScore[level]) {
        alive = false;
        canvas.nextLevelScreen();
        level++;
        if (level < 4) {
          setTimeout(() => {
            alive = true;
            scoreboard.score = 0;
            ball = new Ball(ctx, x, y, { x: speed, y: speed * 1.5 });
            paddle.x = (WIDTH - paddle.width) / 2;
            bricks = generateBricks(ctx, level);
  
            render(0);
          }, 3000);
        } else {
          canvas.showWinScreen();
        }
      }
    } else {
      if (ball.y + vel.y > HEIGHT - ball.radius) {
        scoreboard.loseLife();
        if (!scoreboard.lives) {
          canvas.gameOverScreen();
          canvasElement.style.cursor = "default";
          alive = false;
  
          canvasElement.addEventListener("click", handleGameRestartClick);
        } else {
          ball = new Ball(ctx, x, y, vel);
          paddle.x = (WIDTH - paddle.width) / 2;
        }
      }
    }

  if (rightPressed) {
    paddle.x = Math.min(paddle.x + 5, WIDTH - paddle.width);
  } else if (leftPressed) {
    paddle.x = Math.max(paddle.x - 5, 0);
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
  const relativeX = e.clientX - canvasElement.offsetLeft;

  if (relativeX > paddle.width / 2 && relativeX < WIDTH - paddle.width / 2) {
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

function handleGameRestartClick(e: MouseEvent) {
  const positions = {
    x: e.offsetX,
    y: e.offsetY,
  };

  if (
    positions.x >= WIDTH / 2 - 100 &&
    positions.x < WIDTH / 2 - 100 + 200 &&
    positions.y >= HEIGHT / 2 + 50 &&
    positions.y < HEIGHT / 2 + 50 + 50
  ) {
    restartGame();
    canvasElement.removeEventListener("click", handleGameRestartClick);
  }
}

function restartGame() {
  alive = true;
  scoreboard.lives = 3;
  scoreboard.score = 0;
  ball = new Ball(ctx, x, y, { x: speed, y: speed * 1.5 });
  paddle.x = (WIDTH - paddle.width) / 2;
  bricks = generateBricks(ctx, level);
  canvasElement.style.cursor = "none";

  render(0);
}