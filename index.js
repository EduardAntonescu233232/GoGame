function initializeGame(){
    const canvas = document.getElementById('canvas')
    const c = canvas.getContext('2d')

    canvas.style.transition = 'ease-in 0.3s'
    let canvasSize
    let cellSize
    const boardSize = 5
    let isGameOver = false
    let currentPlayerType = "human"
    const passButton = document.querySelector(".pass-button")
    const surrButton = document.querySelector(".surrender-button")
    let currentScore
    let newScore
    function resizeCanvas(){
        const windowWidth = window.innerWidth
        const windowHeight = window.innerHeight

        canvasSize = Math.min(windowWidth, windowHeight) * 0.7
        canvas.height = canvasSize
        canvas.width = canvasSize
        cellSize = canvasSize / (boardSize + 1)

        drawBackground()
        drawBoard()
    }


    c.fillStyle = "rgb(183, 192, 216)"
    c.fillRect(0, 0, canvasSize, canvasSize)

    let consecutivePasses = 0

    function drawBackground(){
        c.fillStyle = "rgb(183, 192, 216)"
        c.fillRect(0, 0, canvasSize, canvasSize)
    }

    function drawBoard(){
        c.strokeStyle = 'white'
        c.lineWidth = 3

        for(let i = 0; i < boardSize; i++){
            c.beginPath()
            c.moveTo(cellSize, i * cellSize + cellSize)
            c.lineTo(canvasSize - cellSize, i * cellSize + cellSize)
            c.stroke()
        }

        for(let j = 0; j < boardSize; j++){
            c.beginPath()
            c.moveTo(j * cellSize + cellSize, cellSize)
            c.lineTo(j * cellSize + cellSize, canvasSize - cellSize)
            c.stroke()
        }
    }

    function isEmpty(x, y){
        for(let stone of stones){
            if(stone.x === x && stone.y === y){
                return false;
            }
        }
        return true;
    }


    let stones = []
    let currentPlayer = "rgb(52, 54, 76)"
    updateBoard();
    class Stone{
        constructor(x, y, color){
            this.x = x
            this.y = y
            this.color = color
        }

    draw(){
        c.fillStyle = this.color
        c.beginPath()
        c.arc(
            this.x * cellSize + cellSize,
            this.y * cellSize + cellSize,
            cellSize / 3,
            0,
            2 * Math.PI
        )
        c.fill()
    }
    }

    function getNeighbors(x, y){
        const neighbors = []
        if(x > 0){
            neighbors.push({x : x - 1, y : y})
        }
        if(x < boardSize - 1){
            neighbors.push({x : x + 1, y : y})
        }
        if(y > 0){
            neighbors.push({x : x, y : y - 1})
        }
        if(y < boardSize - 1){
            neighbors.push({x : x, y : y + 1})
        }
        return neighbors
    }

    function getStone(x, y){
        for(let stone of stones){
            if(stone.x === x && stone.y === y){
                return stone
            }
        }
        return null
    }

    function addStone(x, y) {
        if (isEmpty(x, y)) {
            const stone = new Stone(x, y, currentPlayer)
            stones.push(stone)
            const capturedStones = captureStones()
            console.log(calculateLiberties(stone))
            console.log(capturedStones)
            if(calculateLiberties(stone).size > 0){
                stone.draw()
                currentPlayer = currentPlayer === "rgb(52, 54, 76)" ? "rgb(232, 237, 249)" : "rgb(52, 54, 76)";
            }
            else if(calculateLiberties(stone).size === 0){
                stones.pop()
                if(currentPlayerType === "ai"){
                    handlePass()
                }
                if(captureStones().length === 0 && currentPlayerType === "human"){
                    return
                }
            } 
            updateBoard()
        } else {
            return 
        } 
    }


    function calculateLiberties(stone){
        const visited = new Set()
        const liberties = new Set()
        
        function dfs(x, y){
            const key = `${x}, ${y}`
            if(visited.has(key)){
                return
            }
            visited.add(key)

            const neighbors = getNeighbors(x, y)
            for(let neighbor of neighbors){
                const neighborStone = getStone(neighbor.x, neighbor.y)
                if(neighborStone === null){
                    liberties.add(`${neighbor.x}, ${neighbor.y}`)
                }
                else if(neighborStone.color === stone.color){
                    dfs(neighbor.x, neighbor.y)
                }
            }
        }

        dfs(stone.x, stone.y)
        return liberties
    }


    let blackCapturedStones = 0
    let whiteCapturedStones = 0

    function captureStones() {
        const capturedStones = []
        for (let stone of stones) {
        const liberties = calculateLiberties(stone)
        if (liberties.size === 0 && stone.color !== currentPlayer) {
            capturedStones.push(stone)
            if(stone.color === "rgb(52, 54, 76)"){
                blackCapturedStones++
            }
            else{
                whiteCapturedStones++
            }
        }
        }
        for (let stone of capturedStones) {
            const index = stones.indexOf(stone)
            stones.splice(index, 1)
        }
        c.clearRect(0, 0, canvasSize, canvasSize)
        drawBackground()
        drawBoard()
        for (let stone of stones) {
            stone.draw()
        }
        return capturedStones
        
    }

    function calculateTerritory() {
        const territory = {
            black: new Set(),
            white: new Set(),
            neutral: new Set()
        };
    
        function isSurrounded(x, y, color, visited) {
            const key = `${x},${y}`;
            if (visited.has(key)) return true;
    
            visited.add(key);
    
            if (x < 0 || x >= boardSize || y < 0 || y >= boardSize) return false;
    
            const stone = getStone(x, y);
            if (stone) return stone.color === color;
    
            const neighbors = getNeighbors(x, y);
            let surrounded = true;
            for (let neighbor of neighbors) {
                if (!isSurrounded(neighbor.x, neighbor.y, color, visited)) {
                    surrounded = false;
                }
            }
            return surrounded;
        }
    
        function exploreTerritory(x, y, visited) {
            const queue = [{ x, y }];
            const points = new Set();
            let isBlackSurrounded = true;
            let isWhiteSurrounded = true;
    
            while (queue.length > 0) {
                const { x, y } = queue.shift();
                const key = `${x},${y}`;
    
                if (visited.has(key) || x < 0 || x >= boardSize || y < 0 || y >= boardSize) continue;
    
                const stone = getStone(x, y);
                if (stone) {
                    if (stone.color === "rgb(52, 54, 76)") isWhiteSurrounded = false;
                    if (stone.color === "rgb(232, 237, 249)") isBlackSurrounded = false;
                    continue;
                }
    
                visited.add(key);
                points.add(key);
    
                const neighbors = getNeighbors(x, y);
                for (let neighbor of neighbors) {
                    queue.push(neighbor);
                }
            }
    
            if (isBlackSurrounded && !isWhiteSurrounded) {
                points.forEach(point => territory.black.add(point));
            } else if (isWhiteSurrounded && !isBlackSurrounded) {
                points.forEach(point => territory.white.add(point));
            } else {
                points.forEach(point => territory.neutral.add(point));
            }
        }
    
        const visited = new Set();
        for (let x = 0; x < boardSize; x++) {
            for (let y = 0; y < boardSize; y++) {
                const key = `${x},${y}`;
                if (!visited.has(key) && !getStone(x, y)) {
                    exploreTerritory(x, y, visited);
                }
            }
        }
        return territory;
    }

    function handlePass() {
        if (currentPlayerType === "ai") {
            consecutivePasses++;
            console.log("Consecutive Passes: ", consecutivePasses);
            if (consecutivePasses === 2) {
                endGame();
            } else {
                showPassMessage("PsyGOpath passed");
                setTimeout(() => {
                    currentPlayer = currentPlayer === "rgb(52, 54, 76)" ? "rgb(232, 237, 249)" : "rgb(52, 54, 76)";
                    currentPlayerType = "human";
                }, 2000);
            }
        } else {
            showSurePass();
        }
    }

    function confirmPass() {
        consecutivePasses++;
        console.log("Consecutive Passes: ", consecutivePasses);
        if (consecutivePasses === 2) {
            endGame();
        } else {
            currentPlayer = currentPlayer === "rgb(52, 54, 76)" ? "rgb(232, 237, 249)" : "rgb(52, 54, 76)";
            currentPlayerType = currentPlayerType === "human" ? "ai" : "human";
            updateBoard();
            if (currentPlayerType === "ai") {
                setTimeout(() => {
                    const aiMove = playAIMove();
                    if (aiMove) {
                        consecutivePasses = 0;
                        console.log("s-a facut o miscare")
                    } else {
                        consecutivePasses++;
                        console.log("AI passed")
                        if (consecutivePasses === 2) {
                            endGame();
                        }
                        else{
                            currentPlayer = currentPlayer === "rgb(52, 54, 76)" ? "rgb(232, 237, 249)" : "rgb(52, 54, 76)";
                            currentPlayerType = "human";
                        }
                    }
                }, 1000);
            }
        }
    }

    function showSurrPass(){
        const gameContainer = document.querySelector('.game-container')
        canvas.style.filter = 'blur(10px)'
        const surrMessage = document.createElement('div')
        surrMessage.textContent = "Are you sure you want to surrender?"
        surrMessage.style.position = 'absolute'
        surrMessage.style.top = '50%'
        surrMessage.style.left = '50%'
        surrMessage.style.transform = 'translate(-50%, -50%)'
        surrMessage.style.marginTop = '-3.5rem'
        surrMessage.style.backgroundColor = 'rgba(52, 54, 76, 0.6)'
        surrMessage.style.color = 'white'
        surrMessage.style.padding = '20px'
        surrMessage.style.fontSize = '2rem'
        surrMessage.style.textAlign = 'center'
        surrMessage.style.borderRadius = '25px'
        surrMessage.style.zIndex = '999'
        surrMessage.style.opacity = '0'
        surrMessage.style.transition = 'ease-in 0.3s'

        const buttonContainer = document.createElement('div')
        buttonContainer.style.marginTop = '20px'

        const yesButton = document.createElement('button')
        yesButton.textContent = "Yes"
        yesButton.classList.add('yes-button')
        yesButton.addEventListener('click', () => {
            surrMessage.style.opacity = '0'
            gameContainer.removeChild(surrMessage)
            canvas.style.filter = 'blur(0px)'
            endGame()
        })


        const noButton = document.createElement('button')
        noButton.textContent = "No";
        noButton.classList.add('no-button')
        noButton.addEventListener('click', () => {
            surrMessage.style.opacity = '0'
            gameContainer.removeChild(surrMessage);
            canvas.style.filter = 'blur(0px)'
        });
        buttonContainer.appendChild(yesButton)
        buttonContainer.appendChild(noButton)
        surrMessage.appendChild(buttonContainer)
        
        setTimeout(() =>{
            gameContainer.appendChild(surrMessage)
            setTimeout(() =>{
                surrMessage.style.opacity = '1'
            }, 100)
        }, 300)
        
    }

    function showSurePass(){
        const gameContainer = document.querySelector('.game-container')
        canvas.style.filter = 'blur(10px)'
        const sureMessage = document.createElement('div')
        sureMessage.textContent = "Are you sure you want to pass?"
        sureMessage.style.position = 'absolute'
        sureMessage.style.top = '50%'
        sureMessage.style.left = '50%'
        sureMessage.style.transform = 'translate(-50%, -50%)'
        sureMessage.style.marginTop = '-3.5rem'
        sureMessage.style.backgroundColor = 'rgba(52, 54, 76, 0.6)'
        sureMessage.style.color = 'white'
        sureMessage.style.padding = '20px'
        sureMessage.style.fontSize = '2rem'
        sureMessage.style.textAlign = 'center'
        sureMessage.style.borderRadius = '25px'
        sureMessage.style.zIndex = '999'
        sureMessage.style.opacity = '0'
        sureMessage.style.transition = 'ease-in 0.3s'

        const buttonContainer = document.createElement('div')
        buttonContainer.style.marginTop = '20px'

        const yesButton = document.createElement('button')
        yesButton.textContent = "Yes"
        yesButton.classList.add('yes-button')
        yesButton.addEventListener('click', () => {
            confirmPass()
            sureMessage.style.opacity = '0'
            gameContainer.removeChild(sureMessage)
            canvas.style.filter = 'blur(0px)'
        })


        const noButton = document.createElement('button')
        noButton.textContent = "No";
        noButton.classList.add('no-button')
        noButton.addEventListener('click', () => {
            sureMessage.style.opacity = '0'
            gameContainer.removeChild(sureMessage);
            canvas.style.filter = 'blur(0px)'
        });
        buttonContainer.appendChild(yesButton)
        buttonContainer.appendChild(noButton)
        sureMessage.appendChild(buttonContainer)
        
        setTimeout(() =>{
            gameContainer.appendChild(sureMessage)
            setTimeout(() =>{
                sureMessage.style.opacity = '1'
            }, 100)
        }, 300)
        
    }

    

    function showPassMessage(message){
        const passMessage = document.createElement('div')
        passMessage.textContent = message
        passMessage.style.position = 'absolute'
        passMessage.style.top = '50%'
        passMessage.style.left = '50%'
        passMessage.style.transform = 'translate(-50%, -50%)'
        passMessage.style.marginTop = '-3rem'
        passMessage.style.backgroundColor = 'rgba(52, 54, 76, 0.8)'
        passMessage.style.color = 'white'
        passMessage.style.padding = '20px'
        passMessage.style.fontSize = '2rem'
        passMessage.style.textAlign = 'center'
        passMessage.style.borderRadius = '25px'
        passMessage.style.zIndex = '999'
        passMessage.style.opacity = '0'
        passMessage.style.transition = 'ease-in 0.5s'
        const gameContainer = document.querySelector('.game-container')
        gameContainer.appendChild(passMessage)
        canvas.style.filter = 'blur(10px)'
        setTimeout(() => {
            passMessage.style.opacity = '1'
            passMessage.style.display = 'block'
        }, 100)
        setTimeout(() =>{
            passMessage.style.opacity = 0
            passMessage.style.display = 'none'
        }, 2000)
        setTimeout(() =>{
            canvas.style.filter = 'blur(0px)'
        }, 2200)
    }
    

    function endGame(){
        consecutivePasses = 0
        const territories = calculateTerritory()
        const blackScore = whiteCapturedStones + territories.black.size
        const whiteScore = blackCapturedStones + territories.white.size + 6.5

        console.log(`Black: ${blackScore} points`)
        console.log(`White: ${whiteScore} points`)

        if(blackScore > whiteScore){
            console.log("Black wins")
        }
        else if(whiteScore > blackScore){
            console.log("White wins")
        }
        else{
            console.log("It's a tie")
        }

        showGameOver(blackScore, whiteScore)
    }

    function showGameOver(blackScore, whiteScore){
        const gameContainer = document.querySelector(".game-container")
        const gameOverScreen = document.createElement('div')
        const gameOverScreenText = document.createElement('h1');
        gameOverScreen.classList.add('game-over-screen')
        gameOverScreen.textContent = "Game Over"

        const canvas = document.getElementById('canvas')
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        gameOverScreen.style.width = `${canvasWidth}px`;
        gameOverScreen.style.height = `${canvasHeight}px`;

        const humanScore = blackScore - whiteScore
        const AIScore = whiteScore - blackScore
        if(blackScore > whiteScore){
            gameOverScreenText.textContent = `You won by ${humanScore} points!`;
        }
        else{
            gameOverScreenText.textContent = `PsyGOpath won by ${AIScore} points!`;

        }
        const playAgain = document.createElement('button')
        playAgain.classList.add('play-again-button')
        playAgain.textContent = "Play Again"
        gameOverScreen.appendChild(gameOverScreenText);
        gameOverScreen.appendChild(playAgain)
        gameContainer.appendChild(gameOverScreen)
        isGameOver = true
        passButton.style.display = 'none'
        surrButton.style.display = 'none'
        playAgain.addEventListener('click', () => {
            isGameOver = false
            drawBackground()
            drawBoard()
            stones = []
            currentScore = 0
            newScore = 6.5
            gameOverScreen.style.display = 'none';
            gameOverScreen.removeChild(playAgain)
            passButton.style.display = 'flex'
            surrButton.style.display = 'flex'
            blackScore = 0
            whiteScore = 0
            currentPlayerType = "human"
            currentPlayer = "rgb(52, 54, 76)"
        })

        return isGameOver
    }

    function handleClick(event){

        if(isGameOver || currentPlayerType !== "human"){
            return
        }

        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top

        const boardX = Math.round((x - cellSize) / cellSize)
        const boardY = Math.round((y - cellSize) / cellSize)

        if(boardX >= 0 && boardX < boardSize && boardY >= 0 && boardY < boardSize){
            if(isEmpty(boardX, boardY)){
                addStone(boardX, boardY)
                consecutivePasses = 0
                if(getStone(boardX, boardY)){
                    currentPlayerType = "ai"
                    setTimeout(playAIMove, 1000)
                }
            }
        }  
    }

    function playAIMove() {
        if (isGameOver) {
            return false;
        }

        const state = new GameState(boardSize, stones, currentPlayer);
        const mcts = new MCTS();
        const move = mcts.run(state, 1000);
        
        if (move) {
            console.log("AI selected move:", move);
            addStone(move.x, move.y);
            const { blackScore, whiteScore } = state.evaluateScore();
    
            const currentScore = currentPlayer === "rgb(52, 54, 76)" ? blackScore : whiteScore;
    
            console.log(`New Score: Black ${blackScore}, White ${whiteScore}`);
    
            currentPlayerType = "human";
            return true;
        } else {
            handlePass();
            return false;
        }
    }




    canvas.addEventListener('click', handleClick)

    resizeCanvas()

    window.addEventListener('resize', resizeCanvas)
    drawBoard()


    class MCTSNode{
        constructor(state, parent = null, move = null){
            this.state = state
            this.parent = parent
            this.move = move
            this.children = []
            this.wins = 0
            this.visits = 0
        }

        expand(moves){
            for (const move of moves) {
                const newState = this.state.clone();
                newState.play(move);
                const child = new MCTSNode(newState, this, move);
                this.children.push(child);
            }
        }

        select() {
            let bestChild = null;
            let bestScore = -Infinity;
            for (const child of this.children) {
                const score = child.wins / child.visits + Math.sqrt(2 * Math.log(this.visits) / child.visits);
                if (score > bestScore) {
                    bestScore = score;
                    bestChild = child;
                }
            }
            return bestChild;
        }

        update(result) {
            this.visits++;
            this.wins += result;
        }

        backpropagate(result) {
            this.update(result);
            if (this.parent) {
                this.parent.backpropagate(result);
            }
        }
    }


    class MCTS {
        constructor(game) {
            this.game = game;
        }
    
        run(state, timeLimit) {
            const rootNode = new MCTSNode(state);
            const startTime = Date.now();
            let iterations = 0;
            const maxIterations = 300;
            const maxDepth = 10
    
            while (Date.now() - startTime < timeLimit && iterations < maxIterations) {
                let node = rootNode;
                let simulationState = state.clone();
                let depth = 0
    
                // Selection
                while (node.children.length > 0 && depth < maxDepth) {
                    node = node.select();
                    simulationState.play(node.move);
                    depth++
                }
    
                // Expansion
                const moves = simulationState.getValidMoves();
                if (moves.length > 0 && depth < maxDepth) {
                    node.expand(moves);
                    node = node.children.sort((a, b) => b.state.heuristic(b.move) - a.state.heuristic(a.move))[0];
                    simulationState.play(node.move);
                    depth++
                }
    
                // Simulation
                while (!simulationState.isGameOver() && depth < maxDepth) {
                    const moves = simulationState.getValidMoves();
                    if (moves.length === 0) {
                        break;
                    }
    
                    const futureMove = this.simulateFutureMoves(simulationState)
                    simulationState.play(futureMove);
                    depth++
                }
    
                // Backpropagation
                const result = simulationState.getResult(state.currentPlayer);
                node.backpropagate(result);
    
                iterations++;
            }
    
            let bestMove = null;
            let bestVisits = -Infinity;
            for (const child of rootNode.children) {
                if (child.visits > bestVisits) {
                    bestVisits = child.visits;
                    bestMove = child.move;
                }
            }
            return bestMove;
        }

        simulateFutureMoves(state){
            const validMoves = state.getValidMoves()
            if(validMoves.length === 0){
                return null
            }
            let bestMove = validMoves[0]
            let bestScore = -Infinity

            for(const move of validMoves){
                const testState = state.clone()
                testState.play(move)

                const score = state.currentPlayer === "rgb(52, 54, 76)"
                    ? testState.evaluateScore().blackScore
                    : testState.evaluateScore().whiteScore;

                if (score > bestScore) {
                    bestScore = score;
                    bestMove = move;
                }
            }

            return bestMove
        }
    }

    class GameState{
        constructor(boardSize, stones, currentPlayer) {
            this.boardSize = boardSize;
            this.stones = stones.map(stone => new Stone(stone.x, stone.y, stone.color));
            this.currentPlayer = currentPlayer;
            this.moveCount = stones.length;
            this.blackCapturedStones = 0;
            this.whiteCapturedStones = 0;
        }

        clone() {
            const clonedState = new GameState(this.boardSize, this.stones, this.currentPlayer);
            clonedState.blackCapturedStones = this.blackCapturedStones;
            clonedState.whiteCapturedStones = this.whiteCapturedStones;
            return clonedState;
        }

        play(move) {
            if (this.isEmpty(move.x, move.y)) {
                const stone = new Stone(move.x, move.y, this.currentPlayer);
                this.stones.push(stone);
                const capturedStones = this.captureStones();

                if(this.calculateLiberties(stone).size === 0){
                    this.stones.pop()
                }
                else{
                    this.currentPlayer = this.currentPlayer === "rgb(52, 54, 76)" ? "rgb(232, 237, 249)" : "rgb(52, 54, 76)";
                }
            }
        }

        isEmpty(x, y) {
            for (let stone of this.stones) {
                if (stone.x === x && stone.y === y) {
                    return false;
                }
            }
            return true;
        }

        captureStones() {
            const capturedStones = [];
            for (let stone of this.stones) {
                const liberties = this.calculateLiberties(stone);
                if (liberties.size === 0 && stone.color !== this.currentPlayer) {
                    capturedStones.push(stone);
                    if(stone.color === "rgb(52, 54, 76)"){
                        this.blackCapturedStones++;
                    }
                    else{
                        this.whiteCapturedStones++;
                    }
                }
            }
            for (let stone of capturedStones) {
                const index = this.stones.indexOf(stone);
                this.stones.splice(index, 1);
            }
            return capturedStones
        }

        getStone(x, y) {
            for (let stone of this.stones) {
                if (stone.x === x && stone.y === y) {
                    return stone;
                }
            }
            return null;
        }

        calculateLiberties(stone) {
            const visited = new Set()
            const liberties = new Set()
        
        const dfs = (x, y) =>{
            const key = `${x}, ${y}`
            if(visited.has(key)){
                return
            }
            visited.add(key)

            const neighbors = getNeighbors(x, y)
            for(let neighbor of neighbors){
                const neighborStone = this.getStone(neighbor.x, neighbor.y)
                if(neighborStone === null){
                    liberties.add(`${neighbor.x}, ${neighbor.y}`)
                }
                else if(neighborStone.color === stone.color){
                    dfs(neighbor.x, neighbor.y)
                }
            }
        }

            dfs(stone.x, stone.y)
            return liberties
        }

        calculateTerritory() {
            const territory = {
                black: new Set(),
                white: new Set(),
                neutral: new Set()
            };
        
            function isSurrounded(x, y, color, visited) {
                const key = `${x},${y}`;
                if (visited.has(key)) return true;
        
                visited.add(key);
        
                if (x < 0 || x >= boardSize || y < 0 || y >= boardSize) return false;
        
                const stone = getStone(x, y);
                if (stone) return stone.color === color;
        
                const neighbors = getNeighbors(x, y);
                let surrounded = true;
                for (let neighbor of neighbors) {
                    if (!isSurrounded(neighbor.x, neighbor.y, color, visited)) {
                        surrounded = false;
                    }
                }
                return surrounded;
            }
        
            function exploreTerritory(x, y, visited) {
                const queue = [{ x, y }];
                const points = new Set();
                let isBlackSurrounded = true;
                let isWhiteSurrounded = true;
        
                while (queue.length > 0) {
                    const { x, y } = queue.shift();
                    const key = `${x},${y}`;
        
                    if (visited.has(key) || x < 0 || x >= boardSize || y < 0 || y >= boardSize) continue;
        
                    const stone = getStone(x, y);
                    if (stone) {
                        if (stone.color === "rgb(52, 54, 76)") isWhiteSurrounded = false;
                        if (stone.color === "rgb(232, 237, 249)") isBlackSurrounded = false;
                        continue;
                    }
        
                    visited.add(key);
                    points.add(key);
        
                    const neighbors = getNeighbors(x, y);
                    for (let neighbor of neighbors) {
                        queue.push(neighbor);
                    }
                }
        
                if (isBlackSurrounded && !isWhiteSurrounded) {
                    points.forEach(point => territory.black.add(point));
                } else if (isWhiteSurrounded && !isBlackSurrounded) {
                    points.forEach(point => territory.white.add(point));
                } else {
                    points.forEach(point => territory.neutral.add(point));
                }
            }
        
            const visited = new Set();
            for (let x = 0; x < boardSize; x++) {
                for (let y = 0; y < boardSize; y++) {
                    const key = `${x},${y}`;
                    if (!visited.has(key) && !getStone(x, y)) {
                        exploreTerritory(x, y, visited);
                    }
                }
            }
            return territory;
        }

        getValidMoves() {
            const validMoves = [];
            for (let x = 0; x < this.boardSize; x++) {
                for (let y = 0; y < this.boardSize; y++) {
                    if (this.isEmpty(x, y)) {
                        const stone = new Stone(x, y, this.currentPlayer);
                        const liberties = this.calculateLiberties(stone);
                        if (liberties.size > 0) {
                            validMoves.push({ x, y });
                        } else {
                            const capturedStones = this.captureStones();
                            if (capturedStones.length > 0) {
                                validMoves.push({ x, y });
                            }
                            else{
                                break
                            }
                        }
                    }
                }
            }
            return validMoves.sort((a, b) => this.heuristic(b) - this.heuristic(a)).slice(0, 10);
        }

        isGameOver() {
            if (consecutivePasses === 2) {
                blackScore = 0
                whiteScore = 0
                return true;
            }
            const validMoves = this.getValidMoves();
            if (validMoves && validMoves.length === 0) {
                return true;
            }
        
            return false;
        }

        getResult(player) {
            const territories = calculateTerritory();
            const blackScore = whiteCapturedStones + territories.black.size;
            const whiteScore = blackCapturedStones + territories.white.size + 6.5;
        
            if (player === "rgb(52, 54, 76)") {
                return blackScore >= whiteScore ? 1 : 0;
            } else {
                return whiteScore >= blackScore ? 1 : 0;
            }
        }

        getNeighbors(x, y) {
            const neighbors = [];
            if (x > 0) {
                neighbors.push({ x: x - 1, y: y });
            }
            if (x < this.boardSize - 1) {
                neighbors.push({ x: x + 1, y: y });
            }
            if (y > 0) {
                neighbors.push({ x: x, y: y - 1 });
            }
            if (y < this.boardSize - 1) {
                neighbors.push({ x: x, y: y + 1 });
            }
            return neighbors;
        }

        heuristic(move){
            const testState = this.clone()
            testState.play(move)

            const currentScore = this.evaluateScore()
            const newScore = testState.evaluateScore()

            let scoreDifference = (newScore.whiteScore - currentScore.whiteScore) - (newScore.blackScore - currentScore.blackScore);

            if(testState.isFillingOwnTerritory(move)){
                scoreDifference -= 100
            }

            const capturedStones = testState.captureStones().length
            scoreDifference += capturedStones * 100

            const liberties = testState.calculateLiberties(new Stone(move.x, move.y, this.currentPlayer)).size
            if(liberties < 2){
                scoreDifference -= 100
            }

            const neighbors = this.getNeighbors(move.x, move.y)
            let allyNeighbors = 0 
            for(const neighbor of neighbors){
                const neighborStone = this.getStone(neighbor.x, neighbor.y)
                if(neighborStone && neighborStone.color === this.currentPlayer){
                    allyNeighbors++
                }
            }
            
            scoreDifference += allyNeighbors * 10

            const isMoveAtRisk = this.isMoveAtRisk(move, this.currentPlayer)
            if(isMoveAtRisk){
                scoreDifference -= 100
            }


            if(move.pass && this.moveCount < (this.boardSize * this.boardSize) / 2){
                scoreDifference -= 100
            }

            if(scoreDifference <= 0 && this.moveCount > (this.boardSize * this.boardSize) * 0.8){
                scoreDifference -= 100;
            }

            return scoreDifference
        }

        isMoveAtRisk(move, playerColor){
            const testState = this.clone()
            testState.play(move)

            const stone = testState.getStone(move.x, move.y)
            if(!stone){
                return false
            }
            const liberties = testState.calculateLiberties(stone).size

            if(liberties < 2){
                return true
            }

            return false
        }

        isFillingOwnTerritory(move){
            const territory = calculateTerritory();
            const key = `${move.x},${move.y}`;

            if (this.currentPlayer === "rgb(52, 54, 76)" && territory.black.has(key)) {
                return true;
            }
            if (this.currentPlayer === "rgb(232, 237, 249)" && territory.white.has(key)) {
                return true;
            }
            return false;
        }

        evaluateScore(){
            const territories = this.calculateTerritory()

            const whiteScore = this.blackCapturedStones + territories.white.size + 6.5
            const blackScore = this.whiteCapturedStones + territories.black.size;
            return { whiteScore, blackScore }
        }
    }

    function updateBoard() {
        c.clearRect(0, 0, canvasSize, canvasSize);
        drawBackground();
        drawBoard();
        for (let stone of stones) {
            stone.draw();
        }
    }

    return{
        initializeGame: initializeGame,
        handlePass: handlePass,
        showSurrPass: showSurrPass,
        showGameOver: showGameOver
    }
    
}
    
export {initializeGame}