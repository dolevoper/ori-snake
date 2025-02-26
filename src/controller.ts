
import { SnakeGame, Position } from "../src/model";
import { GameView } from "../src/view"

export class GameController {
    private game: SnakeGame;
    private view: GameView;
    private gameLoopId: number | null = null;
    
    constructor() {
        this.game = new SnakeGame();
        this.view = new GameView(this.game);
        this.setupEventListeners();
    }

    startGame(): void {
        this.gameLoopId = setInterval(() => {
            this.game.moveSnake();
            this.view.render();
            
            if (this.game.isGameOver) {
                this.endGame();
            }
        }, this.getSpeed());
    }

    private getSpeed(): number {
        switch (this.game.difficulty) {
            case "easy": return 200;
            case "normal": return 150;
            case "hard": return 100;
            default: return 150;
        }
    }

    private setupEventListeners(): void {
        document.addEventListener("keydown", (event) => {
            const directionMap: { [key: string]: Position } = {
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

    private endGame(): void {
        if (this.gameLoopId) {
            clearInterval(this.gameLoopId);
        }

        const playerName = prompt("Game Over! Enter your name:");
        if (playerName) {
            this.saveScore(playerName, this.game.score);
        }
    }

    private saveScore(name: string, score: number): void {
        const scores = JSON.parse(localStorage.getItem("leaderboard") || "[]");
        scores.push({ name, score });
        scores.sort((a, b) => b.score - a.score);
        localStorage.setItem("leaderboard", JSON.stringify(scores.slice(0, 5)));
    }
}
