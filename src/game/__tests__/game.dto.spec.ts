import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { GameDto } from '../game.dto';

describe('GameDto', () => {
  it('validates a proper square grid', async () => {
    const dto = plainToInstance(GameDto, {
      grid: [
        ['X', '', 'O'],
        ['O', 'X', ''],
        ['X', 'O', 'X'],
      ],
      gridSize: 3,
    });

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('fails validation on non-square grid', async () => {
    const dto = plainToInstance(GameDto, {
      grid: [
        ['X', '', 'O'],
        ['O', 'X'],
        ['X', 'O', 'X'],
      ],
      gridSize: 3,
    });

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isValidGrid');
  });

  it('fails validation on invalid characters', async () => {
    const dto = plainToInstance(GameDto, {
      grid: [
        ['X', '', 'Z'], // 'Z' is invalid
        ['O', 'X', ''],
        ['X', 'O', 'X'],
      ],
      gridSize: 3,
    });

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isValidGrid');
  });

  it('fails validation when not an array', async () => {
    const dto = plainToInstance(GameDto, {
      grid: 'not-an-array',
      gridSize: 3,
    });

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isArray');
  });
});