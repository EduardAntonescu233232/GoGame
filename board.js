import { Stone } from "./stone.js";
export class Board{
    constructor(canvas, boardSize) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.boardSize = boardSize;
        this.canvasSize = 0;
        this.cellSize = 0;
        this.stones = [];
    }

    resize() {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        this.canvasSize = Math.min(windowWidth, windowHeight) * 0.7;
        this.canvas.height = this.canvasSize;
        this.canvas.width = this.canvasSize;
        this.cellSize = this.canvasSize / (this.boardSize + 1);
        this.drawBackground();
        this.drawBoard();
    }

    drawBackground() {
        this.context.fillStyle = "rgb(183, 192, 216)";
        this.context.fillRect(0, 0, this.canvasSize, this.canvasSize);
    }

    drawBoard() {
        const c = this.context;
        c.strokeStyle = "white";
        c.lineWidth = 3;
        c.fillStyle = "white";
        c.font = '20px "bebas"';
    
        for (let i = 0; i < this.boardSize; i++) {
          c.beginPath();
          c.moveTo(this.cellSize, i * this.cellSize + this.cellSize);
          c.lineTo(this.canvasSize - this.cellSize, i * this.cellSize + this.cellSize);
          c.stroke();
        }
    
        for (let j = 0; j < this.boardSize; j++) {
          c.beginPath();
          c.moveTo(j * this.cellSize + this.cellSize, this.cellSize);
          c.lineTo(j * this.cellSize + this.cellSize, this.canvasSize - this.cellSize);
          c.stroke();
        }
    
        const letters = "ABCDEFGHJKLMNOPQRST";
        for (let i = 0; i < this.boardSize; i++) {
          c.fillText(letters[i], (i + 1) * this.cellSize, this.cellSize / 2);
        }
    
        for (let i = 0; i < this.boardSize; i++) {
          c.fillText((this.boardSize - i).toString(), this.cellSize / 4, (i + 1) * this.cellSize + 8);
        }
    }

    clear() {
        this.context.clearRect(0, 0, this.canvasSize, this.canvasSize);
    }

    update() {
        this.clear();
        this.drawBackground();
        this.drawBoard();
        for (let stone of this.stones) {
          stone.draw(this.context, this.cellSize);
        }
        if(this.lastStone){
          this.drawLastStoneIndicator(this.lastStone);
        }
    }

    drawLastStoneIndicator(stone) {
      const cellCenterX = stone.x * this.cellSize + this.cellSize;
      const cellCenterY = stone.y * this.cellSize + this.cellSize;
      const radius = this.cellSize * 0.03;
      this.context.beginPath();
      this.context.lineWidth = 10;
      this.context.arc(cellCenterX, cellCenterY, radius, 0, 2 * Math.PI);
      if(stone.color === "rgb(52, 54, 76)"){
        this.context.strokeStyle = "rgb(232, 237, 249)";
      } else{ 
        this.context.strokeStyle = "rgb(52, 54, 76)";
      }
      this.context.stroke();
    }

    isEmpty(x, y) {
        return !this.stones.some((stone) => stone.x === x && stone.y === y);
    }

    addStone(x, y, color) {
        if (this.isEmpty(x, y)) {
          const stone = new Stone(x, y, color);
          this.stones.push(stone);
          return stone;
        }
        return null;
    }

    getStone(x, y) {
        return this.stones.find((stone) => stone.x === x && stone.y === y) || null;
    }

    getNeighbors(x, y) {
        const neighbors = [];
        if (x > 0) neighbors.push({ x: x - 1, y });
        if (x < this.boardSize - 1) neighbors.push({ x: x + 1, y });
        if (y > 0) neighbors.push({ x, y: y - 1 });
        if (y < this.boardSize - 1) neighbors.push({ x, y: y + 1 });
        return neighbors;
    } 

    getKomi(boardSize){
      if(boardSize >= 9){
        return 6.5;
      } else{
        return 0;
      }
    }
}