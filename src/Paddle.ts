import { HEIGHT, WIDTH } from "./app";

export class Paddle {
  public x: number;
  public y: number;

  constructor(
    private ctx: CanvasRenderingContext2D,
    private img: CanvasImageSource,
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
    this.ctx.drawImage(this.img, 8, 150,65, 25, this.x, this.y - 15, this.width, this.height + 15);

    this.ctx.closePath();
  }

  move(position: number) {
    if (position > WIDTH - this.width) {
      position = WIDTH - this.width;
    }
    this.x = position;
  }
}