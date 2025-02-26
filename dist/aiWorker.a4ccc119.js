function gtpToCoords(gtp, boardSize) {
    if (!gtp || gtp.toLowerCase() === "pass") return "pass";
    gtp = gtp.trim().toUpperCase();
    const letter = gtp.charAt(0);
    const numberStr = gtp.slice(1);
    const gtpY = parseInt(numberStr, 10);
    let x = letter.charCodeAt(0) - "A".charCodeAt(0);
    if (letter >= "I") x--;
    const y = boardSize - gtpY;
    return {
        x,
        y
    };
}
self.addEventListener("message", async (event)=>{
    const { type, boardSize, gameState } = event.data;
    if (type === "getBestMove") try {
        const response = await fetch("http://localhost:8000/genmove/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                color: gameState.board.currentPlayerColor
            })
        });
        const data = await response.json();
        let move = null;
        if (data && data.move) move = data.move.toLowerCase() === "pass" ? "pass" : gtpToCoords(data.move, boardSize);
        self.postMessage({
            type: "bestMove",
            move
        });
    } catch (error) {
        self.postMessage({
            type: "bestMove",
            move: null
        });
    }
});

//# sourceMappingURL=aiWorker.a4ccc119.js.map
