import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async getNextMove(grid: string[][], player: string): Promise<{ row: number; col: number }> {
    const flatGrid = grid.map(row => row.join(' | ')).join('\n');

    const prompt = `
You're playing Tic Tac Toe on a ${grid.length}x${grid.length} board.
The board looks like this (empty = ""):
${flatGrid}

You are '${player}'. What is your next best move?
Return your answer as JSON like: { "row": 1, "col": 2 }
`;

    const response = await this.openai.chat.completions.create({
    //Im not sure what model to use, so I used the one that was in the example I found. Might be outdated
      model: 'gpt-3.5-turbo',
      temperature: 0.2,
      messages: [
        { role: 'user', content: prompt },
      ],
    });

    const text = response.choices[0].message.content;

    try {
      const move = JSON.parse(text || '');
      return { row: move.row, col: move.col };
    } catch (e) {
      throw new Error(`Could not parse OpenAI response: ${text}`);
    }
  }
}