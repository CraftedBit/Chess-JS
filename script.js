document.addEventListener('DOMContentLoaded', () => {

    const chessboard = document.getElementById('chessboard');

    function createChessboard() {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const square = document.createElement('div');
                square.classList.add('square');

                if ((i + j) % 2 === 0) {
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
        const rows = fen.split('/');
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

    createChessboard()
    const initialFEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
    updateChessboard(initialFEN);
});