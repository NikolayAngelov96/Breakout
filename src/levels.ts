import { Brick } from "./Brick";

const levels = {
  1: {
    rows: 3,
    cols: 5,
    brickWidth: 175,
    brickHeight: 20,
    brickPadding: 7,
    brickOffsetTop: 70,
    brickOffsetLeft: 30,
  },
  2: {
    rows: 4,
    cols: 7,
    brickWidth: 115,
    brickHeight: 20,
    brickPadding: 10,
    brickOffsetTop: 70,
    brickOffsetLeft: 50,
  },
  3: {
    rows: 4,
    cols: 11,
    brickWidth: 75,
    brickHeight: 20,
    brickPadding: 8,
    brickOffsetTop: 70,
    brickOffsetLeft: 30,
  },
};

export const levelScore = {
  1: 30,
  2: 58,
  3: 115,
};

export function generateBricks(ctx: CanvasRenderingContext2D, level: number) {
  let bricks: Brick[] = [];

  const brickWidth = levels[level].brickWidth;
  const brickHeight = levels[level].brickHeight;

  const brickPadding = levels[level].brickPadding;
  const brickOffsetTop = levels[level].brickOffsetTop;
  const brickOffsetLeft = levels[level].brickOffsetLeft;

  for (let row = 0; row < levels[level].rows; row++) {
    for (let col = 0; col < levels[level].cols; col++) {
      let brickX = col * (brickWidth + brickPadding) + brickOffsetLeft;
      let brickY = row * (brickHeight + brickPadding) + brickOffsetTop;
      if (row == 0) {
        bricks.push(new Brick(ctx, brickX, brickY, brickWidth, brickHeight, 3));
      } else if (row == 1) {
        bricks.push(new Brick(ctx, brickX, brickY, brickWidth, brickHeight, 2));
      } else if (row == 2) {
        bricks.push(new Brick(ctx, brickX, brickY, brickWidth, brickHeight, 1));
      } else if (row == 3) {
        if (col % 2 == 0) {
          bricks.push(
            new Brick(ctx, brickX, brickY, brickWidth, brickHeight, 4)
          );
        } else {
          if (level == 3) {
            bricks.push(
              new Brick(ctx, brickX, brickY, brickWidth, brickHeight, 5)
            );
          }
        }
      }
    }
  }

  return bricks;
}
