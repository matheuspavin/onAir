export type Player = 'X' | 'O';

export interface GameInput {
    grid: string[][];
    gridSize: number;
}

export interface GameResult extends GameInput {
    winner: Player | null;
    createdAt: Date;
}