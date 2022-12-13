import { HEIGHT, WIDTH } from "./app";
import { Brick } from "./Brick";
import { Paddle } from "./Paddle";

export class Ball {
  private ctx: CanvasRenderingContext2D;
  constructor(
    renderingCtx: CanvasRenderingContext2D,
    public x: number,
    public y: number,
    public vel: { x: number; y: number },
    public radius: number = 10
  ) {
    this.ctx = renderingCtx;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = "white";
    this.ctx.fill();
    this.ctx.closePath();
  }

  move() {
    this.x += this.vel.x;
    this.y += this.vel.y;
  }

  checkCollision(paddle: Paddle, bricks: Brick[]) {
    this.checkForCollisionWithPerimeter();
    this.checkForCollisionWithPaddle(paddle);
    this.checkForCollisionWithBricks(bricks);
  }

  checkForCollisionWithPerimeter() {
    if (
      this.x + this.vel.x > WIDTH - this.radius ||
      this.x + this.vel.x < this.radius
    ) {
      this.vel.x = -this.vel.x;
    }

    if (this.y + this.vel.y < this.radius) {
      this.vel.y = -this.vel.y;
    }
  }

  checkForCollisionWithPaddle(paddle: Paddle) {
    if (this.y + this.vel.y > HEIGHT - this.radius - paddle.height - 10) {
      if (this.x > paddle.x && this.x < paddle.x + paddle.width) {
        this.vel.y = -this.vel.y;
        let centerOfPaddleX = paddle.x + paddle.width / 2;
        let ballDistFromPaddleCenterX = this.x - centerOfPaddleX;
        this.vel.x = ballDistFromPaddleCenterX * 0.05;
      }
    }
  }

  checkForCollisionWithBricks(bricks: Brick[]) {
    for (const brick of bricks) {
      if (
        this.x > brick.x &&
        this.x < brick.x + brick.width &&
        this.y + this.radius > brick.y &&
        this.y - this.radius < brick.y + brick.height
      ) {
        this.vel.y = -this.vel.y;
        brick.isHitted = true;
      }
    }
  }
}
