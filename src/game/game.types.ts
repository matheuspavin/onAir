export type Player = 'X' | 'O';

export interface GameInput {
  grid: string[][];
  gridSize: number;
}

export interface GameResult extends GameInput {
  id: string;
  winner: Player | null;
  createdAt: Date;
}
