export type Player = 'X' | 'O';

export interface gameInput {
    grid: string[][];
    gridSize: number;
}

export interface gameResult extends gameInput {
    winner: Player | null;
    createdAt: Date;
}