import { WIDTH } from './app';

type ScoreStats = { score: number, lives: number };

export class Scoreboard {
    private ctx: CanvasRenderingContext2D;
    public lives: number;
    public score: number;

    constructor(ctx: CanvasRenderingContext2D, stats: ScoreStats) {
        this.ctx = ctx;
        this.score = stats.score;
        this.lives = stats.lives;
    }

    showStats() {
        this.ctx.font = "18px Arial";
        this.ctx.fillStyle = "white";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText(`Score: ${this.score}`, 50, 20);
        this.ctx.fillText(`Lives: ${this.lives}`, WIDTH - 50, 20);
    }

    loseLife() {
        this.lives--;
    }

    incrementScore() {
        this.score++;
    }
}