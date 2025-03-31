jest.mock('fs', () => {
    return {
      existsSync: jest.fn(),
      readFileSync: jest.fn(),
      writeFileSync: jest.fn(),
    };
  });
  
const fs = require('fs');
import { loadGames, saveGame, deleteGames } from '../game.store';
import { GameResult } from '../game.types';

const mockFs = fs as jest.Mocked<typeof fs>;

describe('Game Store', () => {
  const sampleGame: GameResult = {
    id: '123',
    gridSize: 3,
    grid: [
      ['X', 'O', 'X'],
      ['O', 'X', 'O'],
      ['O', 'X', 'O'],
    ],
    winner: 'X',
    createdAt: new Date(),
  };

  beforeEach(() => {
    mockFs.existsSync.mockReturnValue(true);
    mockFs.readFileSync.mockReturnValue('[]');
    mockFs.writeFileSync.mockImplementation(() => {});
    jest.clearAllMocks();
  });

  it('creates a new file if it does not exist', () => {
    mockFs.existsSync.mockReturnValue(false);

    const result = loadGames();

    expect(mockFs.writeFileSync).toHaveBeenCalledWith('src/game/games.json', '[]');
    expect(result).toEqual([]);
  });

  it('loads and parses existing games', () => {
    mockFs.readFileSync.mockReturnValue(JSON.stringify([sampleGame]));

    const result = loadGames();
    result[0].createdAt = new Date(result[0].createdAt);
    expect(result).toEqual([sampleGame]);
  });

  it('saves a new game', async () => {
    mockFs.readFileSync.mockReturnValue('[]');

    await saveGame(sampleGame);

    expect(mockFs.writeFileSync).toHaveBeenCalledWith(
      'src/game/games.json',
      JSON.stringify([sampleGame], null, 2),
    );
  });

  it('resets file on delete', () => {
    deleteGames();

    expect(mockFs.writeFileSync).toHaveBeenCalledWith('src/game/games.json', '[]');
  });
});