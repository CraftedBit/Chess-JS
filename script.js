const chessboard = document.getElementById('chessboard');

function createChessboard() {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const square = document.createElement('div');
            square.classList.add('square');
            chessboard.appendChild(square);
        }
    }
}

createChessboard();