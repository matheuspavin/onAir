import { checkWinner } from '../game.utils';

describe('checkWinner', () => {
  it('detects row winner', () => {
    const grid = [
      ['X', 'X', 'X'],
      ['O', '', 'O'],
      ['', '', ''],
    ];
    expect(checkWinner(grid)).toBe('X');
  });

  it('detects column winner', () => {
    const grid = [
      ['O', 'X', ''],
      ['O', 'X', ''],
      ['O', '', 'X'],
    ];
    expect(checkWinner(grid)).toBe('O');
  });

  it('detects diagonal winner', () => {
    const grid = [
      ['X', '', 'O'],
      ['O', 'X', ''],
      ['O', '', 'X'],
    ];
    expect(checkWinner(grid)).toBe('X');
  });

  it('returns null for no winner', () => {
    const grid = [
      ['X', 'O', 'X'],
      ['X', 'O', 'O'],
      ['O', 'X', 'X'],
    ];
    expect(checkWinner(grid)).toBe(null);
  });

  it('works with 4x4 grid', () => {
    const grid = [
      ['O', 'X', '', ''],
      ['O', 'X', '', ''],
      ['O', 'X', '', ''],
      ['O', '', '', ''],
    ];
    expect(checkWinner(grid)).toBe('O');
  });
});
