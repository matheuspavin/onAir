import { Injectable } from '@nestjs/common';
import { GameInput, GameResult } from './game.types';
import { checkWinner } from './game.utils';

@Injectable()
export class GameService {
  private games: GameResult[] = [];

  evaluateGame(input: GameInput): GameResult {
    const winner = checkWinner(input.grid);
    const result: GameResult = {
      ...input,
      winner,
      createdAt: new Date(),
    };

    if (winner) this.games.push(result);
    return result;
  }

  getCompletedGames(): GameResult[] {
    return this.games.filter(game => game.winner !== null);
  }
}
