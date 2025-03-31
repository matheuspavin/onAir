import { Injectable } from '@nestjs/common';
import { GameInput, GameResult } from './game.types';
import { checkWinner } from './game.utils';
import { v4 as uuidv4 } from 'uuid';
import { saveGame, loadGames } from './game.store';

@Injectable()
export class GameService {
  private games: GameResult[] = [];

  evaluateGame(input: GameInput): GameResult {
    const winner = checkWinner(input.grid);
    const result: GameResult = {
      ...input,
      id: uuidv4(),
      winner,
      createdAt: new Date(),
    };
    //I need to check if there is a draw, if there is so, then we save the game as a draw
    if (winner) saveGame(result);
    return result;
  }

  getCompletedGames(): GameResult[] {
   return loadGames();
  }
}
