import { HEIGHT } from "./app";
import { Paddle } from "./Paddle";

export class Bonus {
    constructor(
      private ctx: CanvasRenderingContext2D,
      private x,
      private y
    ) {}

    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = "#eeffff";
        this.ctx.font = "14px Arial";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText('ENLARGE', this.x, this.y);
        this.ctx.fill();
        this.ctx.closePath();
    
        this.move();
      }

    move() {
        this.y += 1;
    }

    hasCollidedWithPaddle(paddle: Paddle) {
        if (this.y > HEIGHT - paddle.height - 10) {
          if (this.x > paddle.x && this.x < paddle.x + paddle.width) {
            return true;
          }
        }

        return false;
    }

    hasCollidedWithBottom() {
        if (this.y > HEIGHT - 10) {
            return true;
        }

        return false;
    }
}   