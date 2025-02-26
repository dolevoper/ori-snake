"use strict";
exports.__esModule = true;
exports.SnakeGame = void 0;
var SnakeGame = /** @class */ (function () {
    function SnakeGame(difficulty) {
        if (difficulty === void 0) { difficulty = "normal"; }
        this.snake = [{ x: 5, y: 5 }];
        this.food = this.generateFood();
        this.direction = { x: 1, y: 0 };
        this.score = 0;
        this.isGameOver = false;
        this.difficulty = difficulty;
    }
    SnakeGame.prototype.generateFood = function () {
        return {
            x: Math.floor(Math.random() * 20),
            y: Math.floor(Math.random() * 20)
        };
    };
    SnakeGame.prototype.moveSnake = function () {
        if (this.isGameOver)
            return;
        var newHead = {
            x: this.snake[0].x + this.direction.x,
            y: this.snake[0].y + this.direction.y
        };
        // Check collisions
        if (this.checkCollision(newHead)) {
            this.isGameOver = true;
            return;
        }
        this.snake.unshift(newHead);
        if (newHead.x === this.food.x && newHead.y === this.food.y) {
            this.score++;
            this.food = this.generateFood();
        }
        else {
            this.snake.pop();
        }
    };
    SnakeGame.prototype.checkCollision = function (position) {
        return (position.x < 0 || position.x >= 20 ||
            position.y < 0 || position.y >= 20 ||
            this.snake.some(function (segment) { return segment.x === position.x && segment.y === position.y; }));
    };
    SnakeGame.prototype.setDirection = function (newDirection) {
        if ((this.direction.x === 0 && newDirection.x !== 0) || (this.direction.y === 0 && newDirection.y !== 0)) {
            this.direction = newDirection;
        }
    };
    return SnakeGame;
}());
exports.SnakeGame = SnakeGame;
