import { Chessboard } from "./chessboard.js";
import { FenManager } from "./fen-manager.js";
import { UIManager } from "./ui-manager.js";

const INITIAL_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
class ChessApp {
    constructor() {
        this.boardElement = document.getElementById("chessboard");

        if(!this.boardElement) {
            throw new Error("Chessboard element not found in the DOM.");
        }

        this.chessboard = new Chessboard(this.boardElement);
        this.fenManager = new FenManager(this.chessboard);
        this.uiManager = new UIManager(this.fenManager);
    }

    init(fen = INITIAL_FEN) {
        this.chessboard.create();
        this.fenManager.parseFen(fen);
        this.uiManager.updateFenDisplay();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    try {
        const chessApp = new ChessApp();
        chessApp.init(INITIAL_FEN);
        window.chessApp = chessApp; // Expose chessApp to the global scope for debugging
    } catch (error) {
        console.error("Error initializing ChessApp:", error);
    }
});

document.addEventListener("mouseover", (event) => { 
    const piece = event.target.closest('.piece');
    if (piece) {
        const square = piece.closest('.square');
        const rank = square.dataset.rank;
        const file = square.dataset.file;
        chessApp.chessboard.highlightSquare(rank, file);
        // Get legal moves for piece and highlight them
    }
});

document.addEventListener("mouseout", (event) => { 
    const piece = event.target.closest('.piece');
    if (piece) {
        chessApp.chessboard.clearHighlights();
    }
    console.log("Mouse out event triggered")
});

document.addEventListener("click", (event) => {
    const piece = event.target.closest('.piece');
    if (piece) {
        const square = piece.closest('.square');
        const rank = square.dataset.rank;
        const file = square.dataset.file;
        chessApp.chessboard.highlightSquare(rank, file);
        // Get legal moves for piece and highlight them
    } 
})