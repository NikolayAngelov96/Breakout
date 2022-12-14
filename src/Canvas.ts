export class Canvas {
  private ctx: CanvasRenderingContext2D;

  constructor(private canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext("2d");
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  nextLevelScreen() {
    this.clear();

    this.ctx.font = "24px Arial";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText(
      "Are you ready?",
      this.canvas.width / 2,
      this.canvas.height / 2
    );
    this.ctx.fillText(
      "Next level is COMING for you",
      this.canvas.width / 2,
      this.canvas.height / 2 + 100
    );
  }

  gameOverScreen() {
    this.clear();

    this.ctx.font = "48px Arial";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText(
      "Game Over",
      this.canvas.width / 2,
      this.canvas.height / 2
    );
    this.ctx.fillRect(
      this.canvas.width / 2 - 100,
      this.canvas.height / 2 + 50,
      200,
      50
    );
    this.ctx.font = "24px Arial";
    this.ctx.fillStyle = "black";
    this.ctx.fillText(
      "Play Again",
      this.canvas.width / 2,
      this.canvas.height / 2 + 75
    );
  }

  showWinScreen() {
    this.clear();

    this.ctx.font = "24px Arial";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText("YOU WIN", this.canvas.width / 2, this.canvas.height / 2);
  }

  startScreen() {
    const textPositionX = this.canvas.width / 2;
    const textPositionY = this.canvas.height / 2;
    this.clear();

    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.font = "36px sans-serif";
    this.ctx.fillStyle = "white";
    this.ctx.fillText("BREAKOUT", textPositionX, textPositionY - 150);
    this.ctx.font = "24px Arial";
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(textPositionX - 65, textPositionY - 15, 130, 30);
    this.ctx.fillStyle = "white";
    this.ctx.fillText("Start Game", textPositionX, textPositionY);
    this.ctx.fillText("Settings", textPositionX, textPositionY + 80);
  }

  isClickedInsideButton(
    clientX: number,
    clientY: number,
    buttonX: number,
    buttonY: number,
    width: number,
    height: number
  ) {
    return (
      clientX >= buttonX &&
      clientX < buttonX + width &&
      clientY >= buttonY &&
      clientY < buttonY + height
    );
  }
}
