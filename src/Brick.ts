export class Brick {
  public isHitted: boolean;

  constructor(
    private ctx: CanvasRenderingContext2D,
    private img: CanvasImageSource,
    public x: number,
    public y: number,
    public width: number,
    public height: number,
    public density: number
  ) {
    this.isHitted = false;
  }

  draw() {
    let sx, sy, sWidth, sHeight;
    this.ctx.beginPath();

    if (this.density == 5) {
      // red
      sx = 48;
      sy = 115;
      sWidth = 66;
      sHeight = 15;

    } else if (this.density == 4) {
      // lilac
      sx = 116
      sy = 75;
      sWidth = 66;
      sHeight = 15;
    } else if (this.density == 3) {
      // green
      sx = 48;
      sy = 95;
      sWidth = 66;
      sHeight = 15;
    } else if (this.density == 2) {
      // yellow
      sx = 116;
      sy = 95;
      sWidth = 66;
      sHeight = 15;
    } else if (this.density == 1) {
      // grey
      sx = 116;
      sy = 113;
      sWidth = 66;
      sHeight = 17;
    }
    this.ctx.drawImage(this.img, sx, sy, sWidth, sHeight, this.x, this.y, this.width, this.height);
    this.ctx.closePath();
  }
}