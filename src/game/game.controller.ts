import { Body, Controller, Get, Post } from '@nestjs/common';
import { GameService } from './game.service';
import { GameDto } from './game.dto';
import { AiService } from 'src/ai/ai.service';

@Controller()
export class GameController {
  constructor(
    private readonly gameService: GameService,
    private readonly aiService: AiService
  ) { }

  @Post('evaluate')
  evaluateGame(@Body() body: GameDto) {
    return this.gameService.evaluateGame(body);
  }

  @Get('completed')
  getCompletedGames() {
    return this.gameService.getCompletedGames();
  }

  @Post('ai-move')
  async getAiMove(@Body() body: { grid: string[][]; player: string }) {
    return this.aiService.getNextMove(body.grid, body.player);
  }

  @Post('delete')
  deleteGames() {
    return this.gameService.deleteGamesFile();
  }
}
