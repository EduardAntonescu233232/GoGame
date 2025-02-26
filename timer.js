export class Timer {
  constructor(selectedTimer) {
    this.playerTime = { black: selectedTimer, white: selectedTimer };
    this.activePlayer = null;    
    this.gameOverCallback = null; 
    this.lastTimestamp = null;    
    this.animationFrameId = null;  
  }

  startTimer(currentPlayer, gameOverCallback) {
    this.pause();

    this.activePlayer = currentPlayer;
    this.gameOverCallback = gameOverCallback;
    this.lastTimestamp = performance.now();
    this.update();
  }

  update = () => {
    if (!this.activePlayer) return;

    const now = performance.now();
    const deltaTime = (now - this.lastTimestamp) / 1000;
    this.lastTimestamp = now;

    const activeKey =
      this.activePlayer.color === "rgb(52, 54, 76)" ? "black" : "white";
    this.playerTime[activeKey] -= deltaTime;

    if (this.playerTime[activeKey] <= 0) {
      this.playerTime[activeKey] = 0;
      this.updateTimerDisplay();
      this.pause();

      if (this.gameOverCallback) {
        this.gameOverCallback();
      }
      return;
    }

    this.updateTimerDisplay();

    this.animationFrameId = requestAnimationFrame(this.update);
  };

  pause() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    this.activePlayer = null;
  }

  reset() {
    this.pause();
    this.playerTime = { black: 300, white: 300 };
    this.updateTimerDisplay();
  }

  updateTimerDisplay() {
    const blackTimeDisplay = document.getElementById("black-time");
    const whiteTimeDisplay = document.getElementById("white-time");
    if (blackTimeDisplay && whiteTimeDisplay) {
      blackTimeDisplay.textContent = this.formatTime(this.playerTime.black);
      whiteTimeDisplay.textContent = this.formatTime(this.playerTime.white);
    }
  }

  formatTime(seconds) {
    const sec = Math.floor(seconds);
    const minutes = Math.floor(sec / 60);
    const remSecs = sec % 60;
    return `${minutes}:${remSecs < 10 ? "0" : ""}${remSecs}`;
  }
}
