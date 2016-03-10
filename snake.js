var snake = [{top: 0, left: 0}],
    apple = [{top: 5, left: 5}, {top: 5, left: 6}],
    drawableSnake = {color: "green", pixels: snake},
    drawableApple = {color: "red", pixels: apple},
    drawableObjects = [drawableSnake, drawableApple];
CHUNK.draw(drawableObjects);