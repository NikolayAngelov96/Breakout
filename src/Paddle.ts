import { HEIGHT, WIDTH } from "./app";

export class Paddle {
  private ctx: CanvasRenderingContext2D;
  public x: number;
  public y: number;

  constructor(
    renderingContext: CanvasRenderingContext2D,
    x?: number,
    y?: number,
    public width: number = 75,
    public height: number = 10
  ) {
    this.ctx = renderingContext;
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
    this.ctx.rect(this.x, this.y, this.width, this.height);
    this.ctx.fillStyle = "#0095DD";
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
