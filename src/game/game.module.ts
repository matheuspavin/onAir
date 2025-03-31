import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { AiService } from 'src/ai/ai.service';

@Module({
  controllers: [GameController],
  providers: [GameService, AiService],
})
export class GameModule {}
