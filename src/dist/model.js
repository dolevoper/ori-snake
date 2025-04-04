export class SnakeGame {
    constructor(difficulty = "normal") {
        this.snake = [{ x: 5, y: 5 }];
        this.food = this.generateFood();
        this.direction = { x: 1, y: 0 };
        this.score = 0;
        this.isGameOver = false;
        this.difficulty = difficulty;
    }
    generateFood() {
        return {
            x: Math.floor(Math.random() * 20),
            y: Math.floor(Math.random() * 20),
        };
    }
    moveSnake() {
        if (this.isGameOver)
            return;
        const newHead = {
            x: this.snake[0].x + this.direction.x,
            y: this.snake[0].y + this.direction.y,
        };
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
    }
    checkCollision(position) {
        return (position.x < 0 || position.x >= 20 ||
            position.y < 0 || position.y >= 20 ||
            this.snake.some(segment => segment.x === position.x && segment.y === position.y));
    }
    setDirection(newDirection) {
        if ((this.direction.x === 0 && newDirection.x !== 0) || (this.direction.y === 0 && newDirection.y !== 0)) {
            this.direction = newDirection;
        }
    }
}
