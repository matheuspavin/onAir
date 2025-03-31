import { GameService } from '../game.service';
import { GameInput } from '../game.types';

jest.mock('../game.store', () => ({
    loadGames: jest.fn(() => []),
    saveGame: jest.fn(),
    deleteGames: jest.fn(),
}));

import * as GameStore from '../game.store';

describe('GameService', () => {
    let service: GameService;

    beforeEach(() => {
        service = new GameService();
        (GameStore.saveGame as jest.Mock).mockClear();
        (GameStore.loadGames as jest.Mock).mockReturnValue([]);
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
        expect(GameStore.saveGame).toHaveBeenCalledTimes(1);

        (GameStore.loadGames as jest.Mock).mockReturnValue([result]);

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

    it('deletes all games', () => {
        service.deleteGamesFile();
        expect(GameStore.deleteGames).toHaveBeenCalledTimes(1);
    });
});
