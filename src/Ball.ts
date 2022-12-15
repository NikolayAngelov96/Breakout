import { HEIGHT, WIDTH } from "./app";
import { Brick } from "./Brick";
import { Paddle } from "./Paddle";

export class Ball {
  constructor(
    private ctx: CanvasRenderingContext2D,
    public x: number,
    public y: number,
    public vel: { x: number; y: number },
    public radius: number = 10
  ) {}

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = "white";
    this.ctx.fill();
    this.ctx.closePath();

    this.move();
  }

  move() {
    this.x += this.vel.x;
    this.y += this.vel.y;
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

  collide(bricks: Brick);
  collide(paddle: Paddle);
  collide(gameObject: Paddle | Brick) {
    if (gameObject instanceof Paddle) {
      this.vel.y = -this.vel.y;
      let centerOfPaddleX = gameObject.x + gameObject.width / 2;
      let ballDistFromPaddleCenterX = this.x - centerOfPaddleX;
      this.vel.x = ballDistFromPaddleCenterX * 0.05;
    } else {
      this.vel.y = -this.vel.y;
      gameObject.density--;
      if (gameObject.density == 0) {
        gameObject.isHitted = true;
      }

      if (Math.abs(this.vel.y) < 10) {
        this.vel.y = this.vel.y * 1.05;
      }
      if (Math.abs(this.vel.x) < 10) {
        this.vel.x = this.vel.x * 1.05;
      }

      if (gameObject.bonusDrop) {
        return true;
      }
    }
  }

  indexOfCollidedBrick(bricks: Brick[]) {
    for (let i = 0; i < bricks.length; i++) {
      const brick = bricks[i];
      if (
        this.x + this.radius > brick.x &&
        this.x - this.radius / 2 < brick.x + brick.width &&
        this.y + this.radius * 2 > brick.y &&
        this.y - this.radius / 2 < brick.y + brick.height + 15
      ) {
        if (this.isSideColiding(brick)) {
            this.vel.x = -this.vel.x;
        }

        return i;
      }
    }

    return -1;
  }

  hasCollidedWithPaddle(paddle: Paddle) {
    if (this.y + this.vel.y > HEIGHT - this.radius - paddle.height - 10) {
      if (this.x > paddle.x && this.x < paddle.x + paddle.width) {
        return true;
      }
    }

    return false;
  }

  private isSideColiding(brick) {
    return this.y  > brick.y + this.vel.y && this.y < brick.y + brick.height + this.vel.y;
  }
}