export class Chessboard {
    constructor(element) {
        this.element = element;
        this.squares = [];
        this.BOARD_SIZE = 8;
    }

    create() {
        const fragment = document.createDocumentFragment();
        for (let rank = 0; rank < this.BOARD_SIZE; rank++) {
            for (let file = 0; file < this.BOARD_SIZE; file++) {
                const square = document.createElement('div');
                square.classList.add('square');

                // Add data attributes for rank and file
                // These attributes can be used for piece placement or other logic
                square.dataset.rank = rank;
                square.dataset.file = file;

                const isLight = (rank + file) % 2 === 0;
                square.classList.add(isLight ? 'white-square' : 'black-square');

                fragment.appendChild(square);
                this.squares.push(square);
            }
        }

        this.element.appendChild(fragment);
        return this;
    }

    placePiece(rank, file, piece) {
        const square = this.getSquare(rank, file);
        if (!square) {
            return false;
        }
        
        // Clear any existing piece in the square before placing a new one
        square.querySelector('piece')?.remove();

        const pieceElement = document.createElement('div');
        pieceElement.classList.add('piece', `piece-${piece}`);
        square.appendChild(pieceElement);

        return true;
    }

    clearPieces() {
        this.element.querySelectorAll('.piece').forEach(piece => piece.remove());
        return this;
    }

    getSquare (rank, file) {
        return this.element.querySelector(`.square[data-rank="${rank}"][data-file="${file}"]`);
    }
}