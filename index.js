function initializeGame(){
    const canvas = document.getElementById('canvas')
    const c = canvas.getContext('2d')

    
    let canvasSize
    let cellSize
    const boardSize = 5
    let isGameOver = false
    let currentPlayerType = "human"
    

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


    const stones = []
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
            }
            else if(calculateLiberties(stone).size === 0){
                stones.pop()
                if(currentPlayerType === "ai"){
                    handlePass()
                }
                if(captureStones().length === 0){
                    return
                }
            } 
            if(getStone(x, y)){
                currentPlayer = currentPlayer === "rgb(52, 54, 76)" ? "rgb(232, 237, 249)" : "rgb(52, 54, 76)" 
            } 
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

    function calculateTerritory(){
        const territory = {
            black: new Set(),
            white: new Set(),
            neutral: new Set()
        }

        function fill(x, y, color, visited){
            const key = `${x}, ${y}`
            if(visited.has(key)){
                return true
            }
            if(x < 0 || x >= boardSize || y < 0 || y >= boardSize){
                return true
            }

            const stone = getStone(x, y)
            if(stone){
                return stone.color === color
            }

            visited.add(key)
            const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]
            let surrounded = true
            for(let [dx, dy] of directions){
                if(!fill(x + dx, y + dy, color, visited)){
                    surrounded = false
                }
            }

            if(surrounded){
                territory[color === "rgb(52, 54, 76)" ? "black" : "white"].add(key)
            }
            else{
                territory.neutral.add(key)
            }
            return surrounded
        }

        for(let x = 0; x < boardSize; x++){
            for(let y = 0; y < boardSize; y++){
                if(!getStone(x, y) && !territory.black.has(`${x}, ${y}`) && !territory.white.has(`${x}, ${y}`) && !territory.neutral.has(`${x}, ${y}`)){
                    fill(x, y, "rgb(52, 54, 76)", new Set()); 
                    fill(x, y, "rgb(232, 237, 249)", new Set());
                }
            }
        }

        return territory
    }

    // function handlePass(){
    //     consecutivePasses++
    //     console.log("Consecutive Passes: ", consecutivePasses)
    //     if(consecutivePasses === 2){
    //         endGame()
    //     }
    //     else{
    //         if(currentPlayerType === "ai"){
    //             PassOverlay("PsyGOpath passed")
    //             currentPlayer = currentPlayer === "rgb(52, 54, 76)" ? "rgb(232, 237, 249)" : "rgb(52, 54, 76)"
    //             currentPlayerType = "human"

    //             updateBoard()

    //             if (currentPlayerType === "ai") {
    //                 setTimeout(playAIMove, 1000)
    //                 consecutivePasses = 0
    //             }
    //         }
    //         else {
    //             currentPlayer = currentPlayer === "rgb(52, 54, 76)" ? "rgb(232, 237, 249)" : "rgb(52, 54, 76)"
    //             currentPlayerType = currentPlayerType === "human" ? "ai" : "human"
    //             updateBoard();
    //             if (currentPlayerType === "ai") {
    //                 setTimeout(playAIMove, 1000);
    //                 consecutivePasses = 0
    //             }
    //         }
    //     }
    // }

    function handlePass(){
        consecutivePasses++;
        console.log("Consecutive Passes: ", consecutivePasses);
        if(consecutivePasses === 2){
            endGame();
        } else {
            if(currentPlayerType === "ai"){
                PassOverlay("PsyGOpath passed");
                setTimeout(() => {
                    currentPlayer = currentPlayer === "rgb(52, 54, 76)" ? "rgb(232, 237, 249)" : "rgb(52, 54, 76)";
                    currentPlayerType = "human";
    
                    updateBoard();
                    if (currentPlayerType === "ai") {
                        setTimeout(playAIMove, 1000);
                        consecutivePasses = 0;
                    }
                }, 2000);
            } else {
                currentPlayer = currentPlayer === "rgb(52, 54, 76)" ? "rgb(232, 237, 249)" : "rgb(52, 54, 76)";
                currentPlayerType = currentPlayerType === "human" ? "ai" : "human";
                updateBoard();
                if (currentPlayerType === "ai") {
                    setTimeout(playAIMove, 1000);
                    consecutivePasses = 0;
                }
            }
        }
    }

    function PassOverlay(message){
        c.fillStyle = "rgba(52, 54, 76, 0.5)"
        c.fillRect(0, 0, canvasSize, canvasSize)

        c.fillStyle = "white"
        c.font = "60px 'bebas'"
        c.textAlign = "center"
        c.fillText(message, canvasSize / 2, canvasSize / 2 - 70)
    }

    function clearPassOverlay(){
        c.clearRect(0, 0, canvasSize, canvasSize)
        drawBackground()
        drawBoard()
        for(let stone of stones){
            stone.draw()
        }
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
        drawBackground()

        c.fillStyle = "rgb(52, 54, 76)"
        c.font = "60px 'bebas'"
        c.textAlign = "center"
        c.fillText("Game Over", canvasSize / 2 , canvasSize / 2 - 70)

        c.font = "40px 'bebas'"
        if(blackScore > whiteScore){
            c.fillText(`You won by ${blackScore - whiteScore} points!`, canvasSize / 2, canvasSize / 2)
        }
        else{
            c.fillText(`PsyGOpath won by ${whiteScore - blackScore} points!`, canvasSize / 2, canvasSize / 2)
        }
        isGameOver = true
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
            addStone(boardX, boardY)
            consecutivePasses = 0
            currentPlayerType = "ai"
            setTimeout(playAIMove, 1000)
        }  
    }

    function playAIMove() {
        if (isGameOver) {
            return;
        }

        const state = new GameState(boardSize, stones, currentPlayer);
        const mcts = new MCTS();
        const move = mcts.run(state, 1000); 
        
        if (move) {
            addStone(move.x, move.y);
            updateBoard();
            currentPlayerType = "human";
        } else {
            handlePass();
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


    class MCTS{
        constructor(game) {
            this.game = game;
        }

        run(state, timeLimit) {
            const rootNode = new MCTSNode(state);
            const startTime = Date.now()
            let iterations = 0
            let maxIterations = 500
            while(Date.now() - startTime < timeLimit && iterations < maxIterations){
                for (let i = 0; i < iterations; i++) {
                    let node = rootNode;
                    let simulationState = state.clone();
        
                    // Selection
                    while (node.children.length > 0) {
                        node = node.select();
                        simulationState.play(node.move);
                    }
        
                    // Expansion
                    const moves = simulationState.getValidMoves();
                    if (moves.length > 0) {
                        node.expand(moves);
                        node = node.children[Math.floor(Math.random() * node.children.length)];
                        simulationState.play(node.move);
                    }
        
                    // Simulation
                    while (!simulationState.isGameOver()) {
                        const moves = simulationState.getValidMoves();
                        const passResult = simulationState.getResult(state.currentPlayer)
                        if(moves.length === 0 || passResult >= 0.5){
                            break
                        }
                        const randomMove = moves[Math.floor(Math.random() * moves.length)];
                        simulationState.play(randomMove);
                    }
        
                    // Backpropagation
                    const result = simulationState.getResult(state.currentPlayer);
                    node.backpropagate(result);
                }

                iterations++
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
    }

    class GameState{
        constructor(boardSize, stones, currentPlayer) {
            this.boardSize = boardSize;
            this.stones = stones;
            this.currentPlayer = currentPlayer;
        }

        clone() {
            return new GameState(this.boardSize, [...this.stones], this.currentPlayer);
        }

        play(move) {
            if (this.isEmpty(move.x, move.y)) {
                const stone = new Stone(move.x, move.y, this.currentPlayer);
                this.stones.push(stone);
                this.captureStones();
                this.currentPlayer = this.currentPlayer === "rgb(52, 54, 76)" ? "rgb(232, 237, 249)" : "rgb(52, 54, 76)";
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
            return validMoves;
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
        handlePass: handlePass
    }
    
}
    
export {initializeGame}