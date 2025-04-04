import { SnakeGame } from "./model.js";
import { GameView } from "./view.js";
export class GameController {
    constructor() {
        this.gameLoopId = null;
        this.game = new SnakeGame();
        this.view = new GameView(this.game);
        this.setupEventListeners();
    }
    startGame() {
        this.gameLoopId = setInterval(() => {
            this.game.moveSnake();
            this.view.render();
            if (this.game.isGameOver) {
                this.endGame();
            }
        }, this.getSpeed());
    }
    getSpeed() {
        switch (this.game.difficulty) {
            case "easy": return 200;
            case "normal": return 150;
            case "hard": return 100;
            default: return 150;
        }
    }
    setupEventListeners() {
        document.addEventListener("keydown", (event) => {
            const directionMap = {
                ArrowUp: { x: 0, y: -1 },
                ArrowDown: { x: 0, y: 1 },
                ArrowLeft: { x: -1, y: 0 },
                ArrowRight: { x: 1, y: 0 },
            };
            if (directionMap[event.key]) {
                this.game.setDirection(directionMap[event.key]);
            }
        });
    }
    endGame() {
        if (this.gameLoopId) {
            clearInterval(this.gameLoopId);
        }
        const playerName = prompt("Game Over! Enter your name:");
        if (playerName) {
            this.saveScore(playerName, this.game.score);
        }
    }
    saveScore(name, score) {
        const scores = JSON.parse(localStorage.getItem("leaderboard") || "[]");
        scores.push({ name, score });
        scores.sort((a, b) => b.score - a.score);
        localStorage.setItem("leaderboard", JSON.stringify(scores.slice(0, 5)));
    }
}
new GameController().startGame();
