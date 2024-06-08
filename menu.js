import { initializeGame} from './index.js';
const mainTitle = document.querySelector(".main-title")
const loader = document.querySelector(".loader")
const gameCanvas = document.querySelector(".game-container")
const playNow = document.getElementById("playNowBtn")
const pass = document.querySelector(".pass-button")
const home = document.querySelector(".menu-home")
const surrender = document.querySelector(".surrender-button")
 
let game
let isGameStarted = false

function showGame(){
    gameCanvas.style.display = 'block'
    mainTitle.style.display = 'none'
    loader.style.display = 'none'
}

function showHome(){
    gameCanvas.style.display = 'none'
    mainTitle.style.display = 'flex'
    loader.style.display = 'flex'
}

function startGame(){
    showGame()
    if(!isGameStarted){
        game = initializeGame()
        isGameStarted = true
    }
}

playNow.addEventListener("click", function(event){
    event.preventDefault()
    startGame()
})

pass.addEventListener("click", function(event){
    event.preventDefault()
    if(game){
        game.handlePass()
    }
})


surrender.addEventListener("click", function(event){
    event.preventDefault()
    if(game){
        game.showSurrPass()
    }
})

home.addEventListener("click", function(event){
    event.preventDefault()
    showHome()
})

