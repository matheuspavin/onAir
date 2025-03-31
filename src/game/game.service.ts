import { Injectable } from '@nestjs/common';
import { GameInput, GameResult } from './game.types';
import { checkWinner, isBoardFull } from './game.utils';
import { v4 as uuidv4 } from 'uuid';
import { saveGame, loadGames } from './game.store';

@Injectable()
export class GameService {
  private games: GameResult[] = [];

  evaluateGame(input: GameInput): GameResult {
    const winner = checkWinner(input.grid);
    const isDraw = !winner && isBoardFull(input.grid);
    const result: GameResult = {
      ...input,
      id: uuidv4(),
      winner,
      createdAt: new Date(),
    };
    if (winner || isDraw) saveGame(result);
    return result;
  }

  getCompletedGames(): GameResult[] {
    return loadGames();
  }
}
