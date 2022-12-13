import { Paddle } from "./Paddle";

// let rightPressed = false;
let leftPressed = false;

export function mouseMoveHandler(e: MouseEvent, canvas: HTMLCanvasElement, paddle: Paddle) {
    const relativeX = e.clientX - canvas.offsetLeft;

    if (
      relativeX > paddle.width / 2 &&
      relativeX < canvas.width - paddle.width / 2
    ) {
      paddle.x = relativeX - paddle.width / 2;
    }
}

export function keyDownHandler(e, canvas, paddle, rightPressed) {
    if (e.key == 'Right' || e.key == 'ArrowRight') {
        rightPressed = true;
    } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
        leftPressed = true;
    }

    if (rightPressed) {
        paddle.x = Math.min(paddle.x + 5, canvas.width - paddle.width);
    } else if (leftPressed) {
        paddle.x = Math.max(paddle.x - 5, 0);
    }  
}

export function keyUpHandler(e, rightPressed) {
    if (e.key == 'Right' || e.key == 'ArrowRight') {
        rightPressed = false;
    } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
        leftPressed = false;
    }
}

// export function asd(paddle, canvas) {
//     // while (rightPressed) {
//     //     paddle.x = Math.min(paddle.x + 5, canvas.width - paddle.width);
//     // }

//     // while (leftPressed) {
//     //     paddle.x = Math.max(paddle.x - 5, 0);
//     // }
// } 