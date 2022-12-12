export class Brick {
    private ctx: CanvasRenderingContext2D;
    public isHitted: boolean;
    constructor(
        renderingContext: CanvasRenderingContext2D,
        public x: number,
        public y: number,
        public width: number,
        public height: number
    ) {
        this.ctx = renderingContext
        this.isHitted = false;
    }

    draw() {
        this.ctx.beginPath();

        this.ctx.rect(this.x, this.y, this.width, this.height);
        this.ctx.fillStyle = "#0095DD";
        this.ctx.fill();
        this.ctx.closePath();
    }
}