export class FenManager {
    constructor(chessboard) {
        this.chessboard = chessboard;
        this.gameState = {
            turn: 'w',
            castling: 'KQkq',
            enPassant: '-',
            halfmove: 0,
            fullmove: 1
        };
    }

    parseFen(fen) {
        try {
            this.chessboard.clearPieces(); // Clear the board before placing pieces by calling a class method to 'tidy up' the code

            const [piecePlacement, turn, castling, enPassant, halfmove, fullmove] = fen.split(' ');
            const pieceRows = piecePlacement.split('/');

            if (!piecePlacement || !turn || !castling || !enPassant || !halfmove || !fullmove) {
                throw new Error("Invalid FEN: string format.");
            }

            if (pieceRows.length !== this.chessboard.BOARD_SIZE) {
                throw new Error("Invalid FEN: incorrect number of ranks.");
            }

            // Update gamestate with active color, castling rights, etc.
            this.gamestate = {
                turn: turn || 'w',
                castling: castling || 'KQkq',
                enPassant: enPassant || '-',
                halfmove: parseInt(halfmove || '0', 10),
                fullmove: parseInt(fullmove || '1', 10)
            };

            // Place pieces on the board based on the parsed FEN string
            pieceRows.forEach((row, rank) => {
                let file = 0;
                [...row].forEach((char) => { // Elegantly iterate over the string
                    if (!isNaN(char)) {
                        file += parseInt(char, 10); // Skip empty squares and ensures int
                    } else {
                        this.chessboard.placePiece(rank, file, char); // Place the piece on the board making a class method call to 'tidy up' the code
                        file++;
                    }
                });
            });

            return true;

        } catch (error) {
            console.error("Error parsing FEN:", error.message);
            return false;
        }
    }

    generateFen() {
        let fen = '';
        
        // Better / easier way to process the board position and gamestate
        for (let rank = 0; rank < this.chessboard.BOARD_SIZE; rank++) {
            let emptySpaces = 0;
            for (let file = 0; file < this.chessboard.BOARD_SIZE; file++) {
                const square = this.chessboard.getSquare(rank, file);
                const piece = square?.querySelector('.piece'); // Use querySelector to find the piece element
    
                if (piece) {
                    if (emptySpaces > 0) {
                        fen += emptySpaces;
                        emptySpaces = 0;
                    }

                    const pieceClass = Array.from(piece.classList).find(cls => cls.startsWith('piece-'));
                
                    if (pieceClass) {
                        fen += pieceClass.split('-')[1]; // Extract the piece type from the class name
                    } 
                } else {
                    emptySpaces++;
                } 
            }
    
            if (emptySpaces > 0) {
                fen += emptySpaces;
            }
    
            if (rank < this.chessboard.BOARD_SIZE - 1) {
                fen += '/';
            }
        }

        // Complete FEN with game state
        const { turn, castling, enPassant, halfmove, fullmove } = this.gameState;
        fen += ` ${turn} ${castling} ${enPassant} ${halfmove} ${fullmove}`;

        return fen;
    }
}