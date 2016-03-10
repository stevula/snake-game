var drawSnake = function(snake) {
    var drawableSnake = {color: "green", pixels: snake},
        drawableObjects = [drawableSnake];
    CHUNK.draw(drawableObjects);
};

var moveSnake = function(snake) {
    var oldSegment = snake[0],
        newSegment = moveSegment(oldSegment);
    newSegment.direction = oldSegment.direction;
    return [newSegment];
};

var advanceGame = function() {
    snake = moveSnake(snake);
    drawSnake(snake);
};

var moveSegment = function(segment) {
    switch (segment.direction) {
        case "down":
            return {top: segment.top + 1, left: segment.left};
        case "up":
            return {top: segment.top - 1, left: segment.left};
        case "right":
            return {top: segment.top, left: segment.left + 1};
        case "left":
            return {top: segment.top, left: segment.left - 1};
        default:
            return segment;
    }
};

var snake = [{top: 1, left: 1, direction: "down"}],
    apple = [{top: 5, left: 10}],
    drawableApple = {color: "red", pixels: apple};

CHUNK.executeNTimesPerSecond(advanceGame, 2);