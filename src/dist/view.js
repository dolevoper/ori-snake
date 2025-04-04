export class GameView {
    constructor(game) {
        this.canvas = document.getElementById("gameCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.game = game;
        this.scoreDisplay = document.getElementById("score");
        this.gameOverScreen = document.getElementById("gameOverScreen");
        this.playerNameInput = document.getElementById("playerName");
    }
    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawSnake();
        this.drawFood();
        this.updateScore();
        if (this.game.isGameOver) {
            this.showGameOverScreen();
        }
    }
    drawSnake() {
        this.ctx.fillStyle = "green";
        this.game.snake.forEach(segment => {
            this.ctx.fillRect(segment.x * 20, segment.y * 20, 20, 20);
        });
    }
    drawFood() {
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(this.game.food.x * 20, this.game.food.y * 20, 20, 20);
    }
    updateScore() {
        this.scoreDisplay.textContent = this.game.score.toString();
    }
    showGameOverScreen() {
        this.gameOverScreen.classList.remove("hidden");
    }
}
