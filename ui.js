export class UI {
    constructor() {
      this.gameContainer = document.querySelector(".game-container");
      this.canvas = document.getElementById("canvas");
      this.passButton = document.querySelector(".pass-button");
      this.surrButton = document.querySelector(".surrender-button");
      this.timers = document.getElementById("timer");
      this.canvasContainer = document.querySelector(".canvas-container");
    }
  
    showSurrPass(confirmCallback) {
      this.canvas.style.filter = "blur(10px)";
      this.timers.style.filter = "blur(10px)";
      canvas.style.pointerEvents = "none";
      this.timers.style.pointerEvents = "none";
      const surrMessage = document.createElement("div");
      surrMessage.classList.add("surr-message");
      surrMessage.textContent = "Are you sure you want to surrender?";
  
      const buttonContainer = document.createElement("div");
      buttonContainer.style.marginTop = "20px";
  
      const yesButton = document.createElement("button");
      yesButton.textContent = "Yes";
      yesButton.classList.add("yes-button");
      yesButton.addEventListener("click", () => {
        surrMessage.style.opacity = "0";
        this.gameContainer.removeChild(surrMessage);
        this.canvas.style.filter = "blur(0px)";
        this.timers.style.filter = "blur(0px)";
        canvas.style.pointerEvents = "auto";
        this.timers.style.pointerEvents = "auto";
        confirmCallback();
      });
  
      const noButton = document.createElement("button");
      noButton.textContent = "No";
      noButton.classList.add("no-button");
      noButton.addEventListener("click", () => {
        surrMessage.style.opacity = "0";
        this.gameContainer.removeChild(surrMessage);
        this.canvas.style.filter = "blur(0px)";
        this.timers.style.filter = "blur(0px)";
        canvas.style.pointerEvents = "auto";
        this.timers.style.pointerEvents = "auto";
      });
  
      buttonContainer.appendChild(yesButton);
      buttonContainer.appendChild(noButton);
      surrMessage.appendChild(buttonContainer);
  
      setTimeout(() => {
        this.gameContainer.appendChild(surrMessage);
        setTimeout(() => {
          surrMessage.style.opacity = "1";
        }, 100);
      }, 300);
    }
  
    showSurePass(confirmCallback) {
      this.canvas.style.filter = "blur(10px)";
      this.timers.style.filter = "blur(10px)";
      canvas.style.pointerEvents = "none";
      this.timers.style.pointerEvents = "none";
      const sureMessage = document.createElement("div");
      sureMessage.classList.add("sure-message");
      sureMessage.textContent = "Are you sure you want to pass?";

      const buttonContainer = document.createElement("div");
      buttonContainer.style.marginTop = "20px";
  
      const yesButton = document.createElement("button");
      yesButton.textContent = "Yes";
      yesButton.classList.add("yes-button");
      yesButton.addEventListener("click", () => {
        confirmCallback();
        sureMessage.style.opacity = "0";
        this.canvasContainer.removeChild(sureMessage);
        this.canvas.style.filter = "blur(0px)";
        this.timers.style.filter = "blur(0px)";
        canvas.style.pointerEvents = "auto";
        this.timers.style.pointerEvents = "auto";
      });
  
      const noButton = document.createElement("button");
      noButton.textContent = "No";
      noButton.classList.add("no-button");
      noButton.addEventListener("click", () => {
        sureMessage.style.opacity = "0";
        this.canvasContainer.removeChild(sureMessage);
        this.canvas.style.filter = "blur(0px)";
        this.timers.style.filter = "blur(0px)";
        canvas.style.pointerEvents = "auto";
        this.timers.style.pointerEvents = "auto";
      });
  
      buttonContainer.appendChild(yesButton);
      buttonContainer.appendChild(noButton);
      sureMessage.appendChild(buttonContainer);

      setTimeout(() => {
        this.canvasContainer.appendChild(sureMessage);
        setTimeout(() => {
          sureMessage.style.opacity = "1";
        }, 100);
      }, 300);
    }
  
    showPassMessage(message, callback) {
      const passMessage = document.createElement("div");
      passMessage.classList.add("pass-message");
      passMessage.textContent = message;

      this.gameContainer.appendChild(passMessage);
      this.canvas.style.filter = "blur(10px)";
      this.timers.style.filter = "blur(10px)";
      setTimeout(() => {
        passMessage.style.opacity = "1";
        passMessage.style.display = "block";
      }, 100);
      setTimeout(() => {
        passMessage.style.opacity = 0;
        passMessage.style.display = "none";
        callback && callback();
      }, 2000);
      setTimeout(() => {
        this.canvas.style.filter = "blur(0px)";
        this.timers.style.filter = "blur(0px)";
      }, 2200);
    }
  
    showGameOver(blackScore, whiteScore, playAgainCallback) {
      const canvas = document.getElementById("canvas");
      const context = canvas.getContext("2d");
      canvas.style.margin = "auto";
      canvas.style.pointerEvents = "none";
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "rgb(183, 192, 216)";
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.font = "48px 'bebas'";
      context.fillStyle = "rgb(52, 54, 76)";
      context.textAlign = "center";

      const humanScore = blackScore - whiteScore;
      const AIScore = whiteScore - blackScore;
      let resultMessage;
      if (blackScore > whiteScore) {
        resultMessage = `You won by ${humanScore} points!`;
      } else {
        resultMessage = `Hikari won by ${AIScore} points!`;
      }
      if(blackScore === whiteScore){
        resultMessage = "It's a tie!";
      }

      context.fillText("Game Over", canvas.width / 2, canvas.height / 2 - 60);
      context.fillText(resultMessage, canvas.width / 2, canvas.height / 2);

      const playAgainButton = document.createElement("button");
      playAgainButton.textContent = "Play Again";
      playAgainButton.classList.add("play-again-button");

      playAgainButton.style.position = "absolute";
      playAgainButton.style.left = "50%";
      playAgainButton.style.top = "50%";

      this.gameContainer.appendChild(playAgainButton);
      this.timers.style.display = "none";

      playAgainButton.addEventListener("click", () => {
        playAgainCallback();
        this.gameContainer.removeChild(playAgainButton);
        this.timers.style.display = "flex";
        canvas.style.pointerEvents = "auto";
      });
    }


    showSureExit(confirmCallback) {
      this.canvas.style.filter = "blur(10px)";
      this.timers.style.filter = "blur(10px)";
      canvas.style.pointerEvents = "none";
      this.timers.style.pointerEvents = "none";
      const exitMessage = document.createElement("div");
      exitMessage.classList.add("exit-message");
      exitMessage.textContent = "Are you sure you want to quit the game?";
    
      const buttonContainer = document.createElement("div");
      buttonContainer.style.marginTop = "20px";
      
      const yesButton = document.createElement("button");
      yesButton.textContent = "Yes";
      yesButton.classList.add("yes-button");
      yesButton.addEventListener("click", () => {
        confirmCallback();
        exitMessage.style.opacity = "0";
        this.canvasContainer.removeChild(exitMessage);
        this.canvas.style.filter = "blur(0px)";
        this.timers.style.filter = "blur(0px)";
        canvas.style.pointerEvents = "auto";
        this.timers.style.pointerEvents = "auto";
      });
      
      const noButton = document.createElement("button");
      noButton.textContent = "No";
      noButton.classList.add("no-button");
      noButton.addEventListener("click", () => {
        exitMessage.style.opacity = "0";
        this.canvasContainer.removeChild(exitMessage);
        this.canvas.style.filter = "blur(0px)";
        this.timers.style.filter = "blur(0px)";
        canvas.style.pointerEvents = "auto";
        this.timers.style.pointerEvents = "auto";
      });
      
      buttonContainer.appendChild(yesButton);
      buttonContainer.appendChild(noButton);
      exitMessage.appendChild(buttonContainer);
    
      setTimeout(() => {
        this.canvasContainer.appendChild(exitMessage);
        setTimeout(() => {
          exitMessage.style.opacity = "1";
        }, 100);
      }, 300);
    }
    
}
  