export class Canvas {
    private ctx: CanvasRenderingContext2D;

    constructor(
        private canvas: HTMLCanvasElement,
    ) {
        this.ctx = canvas.getContext('2d')
    }

    clear () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    nextLevelScreen() {
        this.clear();

        this.ctx.font = "24px Arial";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText("Are you ready?", this.canvas.width / 2, this.canvas.height / 2);
        this.ctx.fillText("Next level is COMING for you", this.canvas.width / 2, this.canvas.height / 2 + 100);
    }

    gameOverScreen() {
        this.clear();

        this.ctx.font = "48px Arial";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText("Game Over", this.canvas.width / 2, this.canvas.height / 2);
        this.ctx.fillRect(this.canvas.width / 2 - 100, this.canvas.height / 2 + 50, 200, 50);
        this.ctx.font = "24px Arial";
        this.ctx.fillStyle = "black";
        this.ctx.fillText("Play Again", this.canvas.width / 2, this.canvas.height / 2 + 75);
    }

    showWinScreen() {
        this.clear();
        
        this.ctx.font = "24px Arial";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText("YOU WIN", this.canvas.width / 2, this.canvas.height / 2);
    }
}