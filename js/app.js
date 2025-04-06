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

document.addEventListener("click", (event) => {
    /* This placeholder event listener is for click events on the chessboard squares. 
       It logs the rank and file of the square being clicked.
    const target = event.target.closest(".square");
    if (target) {
        const rank = target.dataset.rank;
        const file = target.dataset.file;
        console.log(`Square clicked: Rank ${rank}, File ${file}`);
    } else {
        console.log("Clicked outside a square.");
    }
    */
});

document.addEventListener("mouseover", (event) => {
    /* This placeholder event listener is for mouseover events on the chessboard squares. 
       It logs the rank and file of the square being hovered over. 
    const target = event.target.closest(".square");
    if (target) {
        const rank = target.dataset.rank;
        const file = target.dataset.file;
        console.log(`Square hovered: Rank ${rank}, File ${file}`);
    } else {
        console.log("Hovered outside a square.");
    }
    */
});