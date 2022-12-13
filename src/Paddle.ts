import { HEIGHT, WIDTH } from "./app";

export class Paddle {
  public x: number;
  public y: number;

  constructor(
    private ctx: CanvasRenderingContext2D,
    x?: number,
    y?: number,
    public width: number = 150,
    public height: number = 10
  ) {
    if (x == undefined) {
      this.x = (WIDTH - this.width) / 2;
    } else {
      this.x = x;
    }
    if (y == undefined) {
      this.y = HEIGHT - 10;
    } else {
      this.y = y;
    }
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y - 10, this.width, this.height);
    this.ctx.fillStyle = "red";
    this.ctx.fill();
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.rect(this.x + 20, this.y - 10, this.width - 41, this.height);
    this.ctx.fillStyle = "white";
    this.ctx.fill();
    this.ctx.closePath();
  }

  move(position: number) {
    if (position > WIDTH - this.width) {
      position = WIDTH - this.width;
    }
    this.x = position;
  }
}