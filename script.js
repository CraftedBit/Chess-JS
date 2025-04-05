// Ensure the DOM is fully loaded before executing the script
document.addEventListener('DOMContentLoaded', () => {

    const chessboard = document.getElementById('chessboard');
    const fenDisplay = document.getElementById('fen');
    const shareButton = document.getElementById('shareButton');

    // Create the chessboard squares
    function createChessboard() {
        chessboard.innerHTML = ''; // Clear existing squares
        for (let rank = 0; rank < 8; rank++) { // Ranks (rows) are 0-7
            for (let file = 0; file < 8; file++) { // Files (columns) are a-h (0-7)
                const square = document.createElement('div');
                square.classList.add('square');
                
                // Add colour classes to squares
                const isLight = (rank + file) % 2 === 0;
                square.classList.add(isLight ? 'white-square' : 'black-square'); // JavaScript approach
            
                chessboard.appendChild(square);
            }
        }
        console.log("Chessboard created");
    }

    function updateChessboardFromFen(fen) {
        // Clears pieces and places them based on FEN. Assumes board squares already exist.
        document.querySelectorAll('.square').forEach(sq => sq.innerHTML = ''); // Clear all pieces first

        const squares = chessboard.getElementsByClassName('square');
        const rows = fen.split(' ')[0].split('/')
        let squareIndex = 0;

        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];

            for (let j = 0; j < row.length; j++) {
                const piece = row[j];
                if (!isNaN(piece)) {
                    squareIndex += parseInt(piece);
                } else {
                    const square = squares[squareIndex];
                    // Clear any existing piece
                    square.innerHTML = '';

                    const pieceElement = document.createElement('div');
                    pieceElement.classList.add('piece', `piece-${piece}`);
                    square.appendChild(pieceElement);

                    squareIndex++;
                }
            }
        }
        console.log("Chessboard updated with FEN: " + fen);
    }

    function generateCurrentFen() {
        let fen = '';
    
        for (let rank = 0; rank < 8; rank++) {
            let emptySpaces = 0;
            for (let file = 0; file < 8; file++) {
                const square = document.getElementsByClassName('square')[rank * 8 + file];
                const piece = square.getElementsByClassName('piece')[0];
    
                if (piece) {
                    if (emptySpaces > 0) {
                        fen += emptySpaces;
                        emptySpaces = 0;
                    }
                    fen += piece.classList[1].split('-')[1];
                } else {
                    emptySpaces ++;
                }
            }
    
            if (emptySpaces > 0) {
                fen += emptySpaces;
            }
    
            if (rank < 7) {
                fen += '/';
            }
        }

        // TODO: Turn / castling / en passant / halfmove / fullmove
        // For now, we will just add a placeholder for these values
        fen += ' w KQkq - 0 1'; // Placeholder values

        if (fenDisplay) {
            fenDisplay.textContent = fen;
        }
        //document.getElementById("fen").innerHTML = currentFen;
        console.log("Current FEN: " + fen);
        return fen;
    }

    function copyFen() {
        const fen = document.getElementById("fen").innerHTML;
        const textArea = document.createElement("textarea");
        textArea.value = fen;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("Copy");
        textArea.remove();
        alert("FEN copied: " + fen);
    }

    // --- Initialization ---
    // Create the chessboard and set up the initial position
    createChessboard()
    const initialFEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'; // Starting position in FEN
    updateChessboardFromFen(initialFEN);
    generateCurrentFen(); // Generate and display the initial FEN

    if (shareButton) {
        shareButton.addEventListener("click", copyFen); // Add event listener to the button
    } else {
        console.error("Share button not found in the DOM.");
    }
    
}); // End of DOMContentLoaded event