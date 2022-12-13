export class Brick {
    private ctx: CanvasRenderingContext2D;
    public isHitted: boolean;


    constructor(
        renderingContext: CanvasRenderingContext2D,
        public x: number,
        public y: number,
        public width: number,
        public height: number,
        public density: number,
    ) {
        this.ctx = renderingContext
        this.isHitted = false;
    }

    draw() {
        this.ctx.beginPath();

        this.ctx.lineWidth = 20;
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(this.x + this.width, this.y);

        // this.ctx.rect(this.x, this.y, this.width, this.height);
        if (this.density == 3) {
            this.ctx.strokeStyle = "#006F00";
        } else if (this.density == 2) {
            this.ctx.strokeStyle = "#C8DF52";
        } else if (this.density == 1) {
            this.ctx.strokeStyle = '#DBE8D8';
        }
        // this.ctx.fillStyle = "#0095DD";
        // this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();
    }
}