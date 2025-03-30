import { Player } from './game.types';

/**
 * Checks if there's a winner in the current grid.
 * Supports any grid size (e.g., 3x3, 4x4, 5x5).
 */
export function checkWinner(grid: string[][]): Player | null {
  const n = grid.length;

  const isWinningLine = (cells: string[]): boolean =>
    cells.every(cell => cell && cell === cells[0]);

  // Check rows and columns
  for (let i = 0; i < n; i++) {
    if (isWinningLine(grid[i])) return grid[i][0] as Player;

    const col = grid.map(row => row[i]);
    if (isWinningLine(col)) return col[0] as Player;
  }

  // Diagonals
  const mainDiag = grid.map((row, i) => row[i]);
  if (isWinningLine(mainDiag)) return mainDiag[0] as Player;

  const antiDiag = grid.map((row, i) => row[n - 1 - i]);
  if (isWinningLine(antiDiag)) return antiDiag[0] as Player;

  return null;
}