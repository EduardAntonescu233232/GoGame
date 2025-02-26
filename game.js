import { Board } from "./board.js";
import { Timer } from "./timer.js";
import { UI } from "./ui.js";
import { Stone } from "./stone.js";
import { Player } from "./player.js";

export class Game {
  constructor(canvas, boardSize, selectedTimer, menu) {

    this.board = new Board(canvas, boardSize);
    this.timer = new Timer(selectedTimer);
    this.ui = new UI();
    this.menu = menu;

    this.boardSize = boardSize;
    this.isGameOver = false;
    this.player1 = new Player("Player 1", "rgb(52, 54, 76)", "human");
    this.player2 = new Player("Player 2", "rgb(232, 237, 249)", "ai");
    this.currentPlayer = this.player1;
    this.consecutivePasses = 0;
    this.blackCapturedStones = 0;
    this.whiteCapturedStones = 0;
    this.moveInProgress = false;

    this.aiWorker = new Worker(new URL('aiWorker.js', import.meta.url, { type: 'module' }));
    this.aiWorker.addEventListener("message", (event) => {
      if (event.data.type === "bestMove") {
        const move = event.data.move;
        if (move === "pass") {
          this.ui.showPassMessage("Hikari passed.", () => this.confirmPass());
        } else if (move && typeof move === "object" && this.board.isEmpty(move.x, move.y)) {
          this.playAIMove(move);
        }
      }
    });

    this.handleClick = this.handleClick.bind(this);
    canvas.addEventListener("click", this.handleClick);
    window.addEventListener("resize", () => this.board.resize());

    this.board.resize();
    this.timer.startTimer(this.currentPlayer, () => this.endGame());
  }

  formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  }

  destroy() {
    if(this.aiWorker){
      this.aiWorker.terminate();
      this.aiWorker = null;
    }
    if(this.board && this.board.canvas){
      this.board.canvas.removeEventListener("click", this.handleClick);
      window.removeEventListener("resize", this.resizeListener);
      if(this.timer){
        this.timer.pause();
      }
    }
  }

  calculateLiberties(stone) {
    const visited = new Set();
    const liberties = new Set();

    const dfs = (x, y) => {
      const key = `${x},${y}`;
      if (visited.has(key)) return;
      visited.add(key);
      const neighbors = this.board.getNeighbors(x, y);
      for (const neighbor of neighbors) {
        const neighborStone = this.board.getStone(neighbor.x, neighbor.y);
        if (!neighborStone) {
          liberties.add(`${neighbor.x},${neighbor.y}`);
        } else if (neighborStone.color === stone.color) {
          dfs(neighbor.x, neighbor.y);
        }
      }
    };

    dfs(stone.x, stone.y);
    return liberties;
  }

  captureStones() {
    const capturedStones = [];
    for (const stone of this.board.stones) {
      const liberties = this.calculateLiberties(stone);
      if (liberties.size === 0 && stone.color !== this.currentPlayer.color) {
        capturedStones.push(stone);
        if (stone.color === this.player1.color) {
          this.blackCapturedStones++;
        } else {
          this.whiteCapturedStones++;
        }
      }
    }
    this.board.stones = this.board.stones.filter(stone => !capturedStones.includes(stone));
    this.board.update();
    return capturedStones;
  }

  calculateTerritory() {
    const territory = { black: new Set(), white: new Set(), neutral: new Set() };

    const exploreTerritory = (x, y, visited) => {
      const queue = [{ x, y }];
      const points = new Set();
      let surroundedByBlack = true;
      let surroundedByWhite = true;

      while (queue.length) {
        const { x, y } = queue.shift();
        const key = `${x},${y}`;
        if (visited.has(key) || x < 0 || x >= this.boardSize || y < 0 || y >= this.boardSize) continue;
        const stone = this.board.getStone(x, y);
        if (stone) {
          if (stone.color === this.player1.color) surroundedByWhite = false;
          if (stone.color === this.player2.color) surroundedByBlack = false;
          continue;
        }
        visited.add(key);
        points.add(key);
        const neighbors = this.board.getNeighbors(x, y);
        for (const neighbor of neighbors) {
          queue.push(neighbor);
        }
      }

      if (surroundedByBlack && !surroundedByWhite) {
        points.forEach(point => territory.black.add(point));
      } else if (surroundedByWhite && !surroundedByBlack) {
        points.forEach(point => territory.white.add(point));
      } else {
        points.forEach(point => territory.neutral.add(point));
      }
    };

    const visited = new Set();
    for (let x = 0; x < this.boardSize; x++) {
      for (let y = 0; y < this.boardSize; y++) {
        const key = `${x},${y}`;
        if (!visited.has(key) && !this.board.getStone(x, y)) {
          exploreTerritory(x, y, visited);
        }
      }
    }
    return territory;
  }

  async addStone(x, y) {
    if (!this.isMoveLegal(x, y)) {
      this.moveInProgress = false;
      return;
    }
    const gtpColor = this.convertColorForGTP(this.currentPlayer.color);
    const gtpCoord = this.convertToGTPCoord(x, y);
    try {
      const response = await fetch("http://localhost:8000/play-move/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ color: gtpColor, coordinate: gtpCoord })
      });
      const data = await response.json();

      if (data.response && data.response.startsWith('=')) {
        const stone = new Stone(x, y, this.currentPlayer.color);
        this.board.stones.push(stone);
        this.lastStone = stone;
        this.board.lastStone = stone;
        this.captureStones();
        this.board.update();

        this.timer.pause();
        this.switchPlayer();
        this.timer.startTimer(this.currentPlayer, () => this.endGame());

        if (this.currentPlayer.type === "ai") {
          this.aiWorker.postMessage({
            type: "getBestMove",
            boardSize: this.boardSize,
            gameState: {
              board: {
                currentPlayerColor: this.convertColorForGTP(this.currentPlayer.color),
                stones: this.board.stones.map(stone => ({
                  x: stone.x,
                  y: stone.y,
                  color: this.convertColorForGTP(stone.color)
                }))
              }
            }
          });
        }
      } else {
        const errorMsg = data.detail || data.response || "Unknown error";
        return;
      }
    } catch (error) {
      return;
    } finally {
      this.moveInProgress = false;
    }
  }

  isMoveLegal(x, y) {
    if(!this.board.isEmpty(x, y)){
      return false;
    }
    const newStone = new Stone(x, y, this.currentPlayer.color);
      let simulatedStones = [...this.board.stones, newStone];
      const getStoneAt = (x, y, stones) =>
        stones.find(stone => stone.x === x && stone.y === y); 

    const calculateLibertiesSimulated = (stone, stones) => {
      const visited = new Set();
      const liberties = new Set();

      const dfs = (x, y) => {
        const key = `${x},${y}`;
        if (visited.has(key)) return;
        visited.add(key);
        const neighbors = this.board.getNeighbors(x, y);
        for (const neighbor of neighbors) {
          const neighborStone = getStoneAt(neighbor.x, neighbor.y, stones);
          if (!neighborStone) {
            liberties.add(`${neighbor.x},${neighbor.y}`);
          } else if (neighborStone.color === stone.color) {
            dfs(neighbor.x, neighbor.y);
          }
        }
      };

      dfs(stone.x, stone.y);
      return liberties;
    };

    let changed = true;
    while(changed){
      changed = false;
      for(const stone of simulatedStones){
        if (stone.color !== this.currentPlayer.color) {
          const libs = calculateLibertiesSimulated(stone, simulatedStones);
          if (libs.size === 0) {
            simulatedStones = simulatedStones.filter(stone => stone !== stone);
            changed = true;
            break;
          }
        }
      }
    }
    const newLibs = calculateLibertiesSimulated(newStone, simulatedStones);
    return newLibs.size > 0;
  }

  convertToGTPCoord(x, y) {
    const letters = "ABCDEFGHJKLMNOPQRST";
    const gtpY = this.boardSize - y;
    return letters[x] + gtpY;
  }

  convertColorForGTP(color) {
    if (color === "rgb(52, 54, 76)") return "B";
    if (color === "rgb(232, 237, 249)") return "W";
    return null;
  }

  playAIMove(move) {
    if (move === "pass") {
      this.ui.showPassMessage("Hikari passed.", () => this.confirmPass()); 
    } else if (move && this.board.isEmpty(move.x, move.y)) {
      const stone = new Stone(move.x, move.y, this.currentPlayer.color);
      this.board.stones.push(stone);
      this.lastStone = stone;
      this.board.lastStone = stone;
      this.captureStones();
      this.board.update();
      this.timer.pause();
      this.switchPlayer();
      this.timer.startTimer(this.currentPlayer, () => this.endGame());
    }
  }

  switchPlayer() {
    this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
  }

  handlePass() {
    this.ui.showSurePass(() => this.confirmPass());
  }

  handleSurrender() {
    this.ui.showSurrPass(() => this.endGame());
  }

  confirmPass() {
    this.timer.pause();
    this.consecutivePasses++;
    if (this.consecutivePasses >= 2) {
      this.endGame();
    } else {
      this.switchPlayer();
      this.timer.startTimer(this.currentPlayer, () => this.endGame());
      if (this.currentPlayer.type === "ai") {
        this.aiWorker.postMessage({
          type: "getBestMove",
          boardSize: this.boardSize,
          gameState: {
            board: {
              currentPlayerColor: this.convertColorForGTP(this.currentPlayer.color),
              stones: this.board.stones.map(stone => ({
                x: stone.x,
                y: stone.y,
                color: this.convertColorForGTP(stone.color)
              }))
            }
          }
        });
      }
    }
  }

  endGame() {
    this.timer.pause();
    this.consecutivePasses = 0;
    const territories = this.calculateTerritory();
    const blackScore = this.whiteCapturedStones + territories.black.size;
    const whiteScore = this.blackCapturedStones + territories.white.size + this.board.getKomi(this.boardSize);
    this.ui.showGameOver(blackScore, whiteScore, () => this.resetGame());
    this.isGameOver = true;
  }

  async resetGame() {
    this.menu.showOptions();
    this.isGameOver = false;
    this.board.stones = [];
    this.blackCapturedStones = 0;
    this.whiteCapturedStones = 0;
    this.currentPlayer = this.player1;
  }

  handleClick(event) {
    if (event.detail > 1) {
      return;
    }
    event.stopPropagation();
    event.preventDefault();

    if (this.isGameOver || this.moveInProgress) {
      return;
    }
    this.moveInProgress = true;
    const rect = this.board.canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;
    const boardX = Math.round((clickX - this.board.cellSize) / this.board.cellSize);
    const boardY = Math.round((clickY - this.board.cellSize) / this.board.cellSize);
    if (boardX >= 0 && boardX < this.boardSize && boardY >= 0 && boardY < this.boardSize) {
      if (this.board.isEmpty(boardX, boardY)) {
        this.consecutivePasses = 0;
        this.addStone(boardX, boardY);
      } else {
        this.moveInProgress = false;
      }
    } else {
      this.moveInProgress = false;
    }
  }
}
