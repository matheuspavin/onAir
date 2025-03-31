import { GameService } from '../game.service';
import { GameInput } from '../game.types';

describe('GameService', () => {
  let service: GameService;

  beforeEach(() => {
    service = new GameService();
  });

  it('evaluates and stores a winning game', () => {
    const input: GameInput = {
      grid: [
        ['X', 'X', 'X'],
        ['O', '', 'O'],
        ['', '', ''],
      ],
      gridSize: 3,
    };

    const result = service.evaluateGame(input);
    expect(result.winner).toBe('X');

    const games = service.getCompletedGames();
    expect(games.length).toBe(1);
    expect(games[0].winner).toBe('X');
  });

  it('does not store games with no winner', () => {
    const input: GameInput = {
      grid: [
        ['X', 'O', 'X'],
        ['O', 'X', 'O'],
        ['O', 'X', 'O'],
      ],
      gridSize: 3,
    };

    const result = service.evaluateGame(input);
    expect(result.winner).toBe(null);

    const games = service.getCompletedGames();
    expect(games.length).toBe(0);
  });
});
