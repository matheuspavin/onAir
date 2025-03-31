import { AiService } from '../ai.service';

jest.mock('openai', () => {
  return {
    default: jest.fn().mockImplementation(() => ({
      chat: {
        completions: {
          create: jest.fn().mockResolvedValue({
            choices: [
              { message: { content: JSON.stringify({ row: 2, col: 1 }) } }
            ]
          })
        }
      }
    }))
  };
});

describe('AiService', () => {
  let service: AiService;

  beforeEach(() => {
    service = new AiService();
  });

  it('should return a suggested move from OpenAI', async () => {
    const grid = [
      ['X', 'O', ''],
      ['', 'X', ''],
      ['', '', 'O'],
    ];

    const move = await service.getNextMove(grid, 'X');
    expect(move).toEqual({ row: 2, col: 1 });
  });
});