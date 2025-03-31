import { Body, Controller, Get, Post } from '@nestjs/common';
import { GameService } from './game.service';
import { GameInputDto } from './game.dto';

@Controller()
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post('evaluate')
  evaluateGame(@Body() body: GameInputDto) {
    return this.gameService.evaluateGame(body);
  }

  @Get('completed')
  getCompletedGames() {
    return this.gameService.getCompletedGames();
  }
}
