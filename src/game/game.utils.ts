import { Player } from './game.types';

/**
 * Checks if there's a winner in the current grid.
 * Supports any grid size (e.g., 3x3, 4x4, 5x5) as long as they are quadratic.
 */
export function checkWinner(grid: string[][]): Player | null {
    //Secondary validation, usually I don't work with preemptive validation, but this is an exercise.
      if (!isSquareGrid(grid)) {
        throw new Error('Invalid grid: must be a square matrix');
    }
    const n = grid.length;
    const isWinningLine = (cells: string[]): boolean =>
        cells.length === n && cells.every(cell => cell && cell === cells[0]);

    // Check rows and columns
    for (let i = 0; i < n; i++) {
        if (isWinningLine(grid[i])) return grid[i][0] as Player;

        const col = grid.map((row) => row[i]);
        if (isWinningLine(col)) return col[0] as Player;
    }

    // Diagonals (I've searched and consider this to be a winning)
    const mainDiag = grid.map((row, i) => row[i]);
    if (isWinningLine(mainDiag)) return mainDiag[0] as Player;

    const antiDiag = grid.map((row, i) => row[n - 1 - i]);
    if (isWinningLine(antiDiag)) return antiDiag[0] as Player;

    return null;
}

export function isBoardFull(grid: string[][]): boolean {
    return grid.every((row) => row.every((cell) => cell !== ''));
}

export function isSquareGrid(grid: string[][]): boolean {
    const size = grid.length;
    return grid.every(row => Array.isArray(row) && row.length === size);
}