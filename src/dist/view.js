"use strict";
exports.__esModule = true;
exports.GameView = void 0;
var GameView = /** @class */ (function () {
    function GameView(game) {
        this.canvas = document.getElementById("gameCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.game = game;
        this.scoreDisplay = document.getElementById("score");
        this.gameOverScreen = document.getElementById("gameOverScreen");
        this.playerNameInput = document.getElementById("playerName");
    }
    GameView.prototype.render = function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawSnake();
        this.drawFood();
        this.updateScore();
        if (this.game.isGameOver) {
            this.showGameOverScreen();
        }
    };
    GameView.prototype.drawSnake = function () {
        var _this = this;
        this.ctx.fillStyle = "green";
        this.game.snake.forEach(function (segment) {
            _this.ctx.fillRect(segment.x * 20, segment.y * 20, 20, 20);
        });
    };
    GameView.prototype.drawFood = function () {
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(this.game.food.x * 20, this.game.food.y * 20, 20, 20);
    };
    GameView.prototype.updateScore = function () {
        this.scoreDisplay.textContent = this.game.score.toString();
    };
    GameView.prototype.showGameOverScreen = function () {
        this.gameOverScreen.classList.remove("hidden");
    };
    return GameView;
}());
exports.GameView = GameView;
