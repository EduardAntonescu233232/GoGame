export class Stone {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.color = color;
    }
  
    draw(context, cellSize) {
      context.fillStyle = this.color;
      context.beginPath();
      context.arc(
        this.x * cellSize + cellSize,
        this.y * cellSize + cellSize,
        cellSize / 3,
        0,
        2 * Math.PI
      );
      context.fill();
    }
  }
  