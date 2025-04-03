document.addEventListener('DOMContentLoaded', () => {

    const chessboard = document.getElementById('chessboard');

    function createChessboard() {
        for (let file = 0; file < 8; file++) {
            for (let rank = 0; rank < 8; rank++) {
                const square = document.createElement('div');
                square.classList.add('square');

                if ((file + rank) % 2 === 0) {
                    square.classList.add('white-square');
                } else {
                    square.classList.add('black-square');
                }
                chessboard.appendChild(square);
            }
        }
    }

    function updateChessboard(fen) {
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
    }

    function currentFen() {
        let currentFen = '';
    
        for (let i = 0; i < 8; i++) {
            let emptySpaces = 0;
    
            for (let j = 0; j < 8; j++) {
                const square = document.getElementsByClassName('square')[i * 8 + j];
                const piece = square.getElementsByClassName('piece')[0];
    
                if (piece) {
                    if (emptySpaces > 0) {
                        currentFen += emptySpaces;
                        emptySpaces = 0;
                    }
                    currentFen += piece.classList[1].split('-')[1];
                } else {
                    emptySpaces += 1;
                }
            }
    
            if (emptySpaces > 0) {
                currentFen += emptySpaces;
            }
    
            if (i < 7) {
                currentFen += '/';
            }
        }
        
        document.getElementById("fen").innerHTML = currentFen;
        //alert(currentFen);
    
        // Turn / castling / en passant / halfmove / fullmove
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

    createChessboard()
    const initialFEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    updateChessboard(initialFEN);
    currentFen();

    document.getElementById("shareButton").addEventListener("click", copyFen);
});