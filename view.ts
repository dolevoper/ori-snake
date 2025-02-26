import { SnakeGame, Position } from "./model";

export class GameView {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private game: SnakeGame;
    private scoreDisplay: HTMLElement;
    private gameOverScreen: HTMLElement;
    private playerNameInput: HTMLInputElement;

    constructor(game: SnakeGame) {
        this.canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d")!;
        this.game = game;
        this.scoreDisplay = document.getElementById("score")!;
        this.gameOverScreen = document.getElementById("gameOverScreen")!;
        this.playerNameInput = document.getElementById("playerName") as HTMLInputElement;
    }

    render(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawSnake();
        this.drawFood();
        this.updateScore();

        if (this.game.isGameOver) {
            this.showGameOverScreen();
        }
    }

    private drawSnake(): void {
        this.ctx.fillStyle = "green";
        this.game.snake.forEach(segment => {
            this.ctx.fillRect(segment.x * 20, segment.y * 20, 20, 20);
        });
    }

    private drawFood(): void {
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(this.game.food.x * 20, this.game.food.y * 20, 20, 20);
    }

    private updateScore(): void {
        this.scoreDisplay.textContent = this.game.score.toString();
    }

    private showGameOverScreen(): void {
        this.gameOverScreen.classList.remove("hidden");
    }
}
