var draw = function(snake, apple) {
    var drawableSnake = {color: "green", pixels: snake},
        drawableApple = {color: "red", pixels: [apple]},
        drawableObjects = [drawableSnake, drawableApple];
    CHUNK.draw(drawableObjects);
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

var moveSnake = function(snake) {
    return snake.map(function(oldSegment, segmentIndex) {
        var newSegment = moveSegment(oldSegment);
        newSegment.direction = segmentFartherForwardThan(segmentIndex, snake).direction;
        return newSegment;
    });
};

var advanceGame = function() {
    var newSnake = moveSnake(snake);
    if (ate(newSnake, snake)) {
        CHUNK.endGame();
        CHUNK.flashMessage("Congrats! You ate yourself.");
    }

    if (ate(newSnake, [apple])) {
        newSnake = growSnake(newSnake);
        apple = CHUNK.randomLocation();
    }
    if (ate(newSnake, CHUNK.gameBoundaries())) {
        CHUNK.endGame();
        CHUNK.flashMessage("Please don't eat the wall.");
    }
    snake = newSnake;
    draw(snake, apple);
};

var segmentFartherForwardThan = function(index, snake) {
    if (snake[index - 1] === undefined) {
        return snake[index];
    }
    else {
        return snake[index - 1];
    }
};

var changeDirection = function(direction) {
    snake[0].direction = direction;
};

var growSnake = function(snake) {
    var indexOfLastSegment = snake.length - 1,
        lastSegment = snake[indexOfLastSegment];
    snake.push({top: lastSegment.top, left: lastSegment.left});
    return snake;
};

var ate = function(snake, otherThing) {
    var head = snake[0];
    return CHUNK.detectCollisionBetween([head], otherThing);
};

var snake = [{top: 1, left: 1, direction: "down"}, {top: 0, left: 1, direction: "down"}],
    apple = {top: 5, left: 10};

CHUNK.executeNTimesPerSecond(advanceGame, 2);
CHUNK.onArrowKey(changeDirection);