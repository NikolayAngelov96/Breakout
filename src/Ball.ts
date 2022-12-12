
export class Ball {
    private ctx: CanvasRenderingContext2D
    constructor(
      renderingCtx: CanvasRenderingContext2D,
      public x: number = 50, 
      public y: number = 150,
      public radius: number = 10
    ) {
        this.ctx = renderingCtx;
    }
  
    draw() {
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      this.ctx.fillStyle = "#0095DD";
      this.ctx.fill();
      this.ctx.closePath();
    }
  }