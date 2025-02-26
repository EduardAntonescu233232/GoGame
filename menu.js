import { Game } from './game.js';
import { UI } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => { const menu = new Menu(); });
 export class Menu{
  constructor(){
    this.ui = new UI();
    this.mainTitle = document.querySelector(".main-title");
    this.gameContainer = document.querySelector(".game-container");
    this.options = document.querySelector(".game-options-container");
    this.playNow = document.getElementById("playNowBtn");
    this.passBtn = document.querySelector(".pass-button");
    this.homeBtn = document.querySelector(".menu-home");
    this.surrenderBtn = document.querySelector(".surrender-button");
    this.startGameBtn = document.querySelector(".start-game");
    this.boardSizeInput = document.querySelector(".board-size-option");
    this.timerInput = document.querySelector(".timer-option");
    this.loadingScreen = document.querySelector(".loading-screen");
    this.menuNavbar = document.querySelector(".main-nav");

    this.game;
    this.isGameStarted = false;
    this.selectedBoardSize = 9;
    this.selectedTimer = 5;

    this.playNow.addEventListener("click", (event) => {
      event.preventDefault();
      if (!this.isGameStarted) {
        this.showOptions();
        this.options.classList.add("active");
        this.updatePlayNowState();
      }
    });
    
    this.startGameBtn.addEventListener("click", (event) => {
      event.preventDefault();
      if(!this.isGameStarted && this.hasSelectedOptions()){
        this.startGame();
      }
    });
    
    this.passBtn.addEventListener("click", (event) => {
      event.preventDefault();
      if (this.game) {
        this.game.handlePass();
      }
    });
    
    this.surrenderBtn.addEventListener("click", (event) => {
      event.preventDefault();
      if (this.game) {
        this.game.ui.showSurrPass(() => {
          this.game.endGame();
        });
      }
    });
    
    this.homeBtn.addEventListener("click", (event) => {
      event.preventDefault();
      this.showHome();
      this.options.classList.remove("active");
    });
    
    this.boardSizeInput.addEventListener("click", (event) => {
      const card = event.target.closest('.sizes-card');
      if (card) {
        this.selectedBoardSize = parseInt(card.textContent.trim(), 10);
        const allCards = document.querySelectorAll('.sizes-card');
        allCards.forEach((item) => {
          item.classList.remove('selected');
        });
        card.classList.add('selected');
        this.updatePlayNowState();
      }
    });

    this.menuNavbar.addEventListener("click", (event) => {
      const card = event.target.closest('.menu-card');
      if(card){
        const allCards = document.querySelectorAll('.menu-card');
        allCards.forEach((item) => {
          item.classList.remove('selected');
        });
        card.classList.add('selected');
      }
    });
    
    this.timerInput.addEventListener("click", (event) => {
      const card = event.target.closest('.timer-card');
      if (card) {
        this.selectedTimer = parseInt(card.dataset.size, 10);
        const allCards = document.querySelectorAll('.timer-card');
        allCards.forEach((item) => {
          item.classList.remove('selected');
        });
        card.classList.add('selected');
        this.updatePlayNowState();
      }
    });
  }

  hasSelectedOptions(){
    return Boolean(document.querySelector(".board-size-option .selected")) &&
           Boolean(document.querySelector(".timer-option .selected"));
  }

  updatePlayNowState(){
    if(this.hasSelectedOptions()){
      this.startGameBtn.classList.add('enabled');
    } else {
      this.startGameBtn.classList.remove('enabled');
    }
  }

  showGame() {
    this.gameContainer.style.display = 'flex';
    this.mainTitle.style.display = 'none';
    this.options.style.width = '0';
    this.options.style.height = '0';
  }

  showOptions() {
    this.options.style.height = 'auto';
    this.options.style.width = '50%';
    this.gameContainer.style.display = 'none';
    this.mainTitle.style.display = 'none';
    this.isGameStarted = false;
    if(this.game){
      this.game.destroy();
      this.game = null;
    }
  }

  showHome() {
    if(this.isGameStarted){
      this.ui.showSureExit(() => {
        const playAgainButton = this.gameContainer.querySelector('.play-again-button');
        if(playAgainButton){
          this.gameContainer.removeChild(playAgainButton);
        }
        const timers = document.getElementById("timer");
        if(timers){
          timers.style.display = 'flex';
        }
        this.gameContainer.style.display = 'none';
        this.mainTitle.style.display = 'flex';
        this.options.style.height = '0'
        this.options.style.width = '0';
        this.isGameStarted = false;
        if(this.game){
          this.game.destroy();
          this.game = null;
        };
      });
    } else{
      const playAgainButton = this.gameContainer.querySelector('.play-again-button');
      if (playAgainButton) {
        this.gameContainer.removeChild(playAgainButton);
      }
      const timers = document.getElementById("timer");
      if (timers) {
        timers.style.display = 'flex';
      }
      this.gameContainer.style.display = 'none';
      this.mainTitle.style.display = 'flex';
      this.options.style.height = '0';
      this.options.style.width = '0';
      this.isGameStarted = false;
      if (this.game) {
        this.game.destroy();
        this.game = null;
      }
    }
  }

  startGame() {
    this.options.style.width = '0';
    setTimeout(() => {
      this.loadingScreen.style.display = 'flex';
    }, 700);
    if (!this.isGameStarted) {
      fetch("http://localhost:8000/clear-board/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ boardSize: this.selectedBoardSize})
      })
        .then(response => response.json())
        .then(data => {
          setTimeout(() => {
            this.loadingScreen.style.display = 'none';
            this.showGame();
            const canvas = document.getElementById("canvas");
            this.game = new Game(canvas, this.selectedBoardSize, this.selectedTimer, this);
            this.isGameStarted = true;
          }, 2000);
        })
        .catch(error => console.error("Error clearing board:", error));
    }
  }
}
