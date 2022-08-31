import { Module } from '@nestjs/common';
import { GrandprixService } from './grandprix.service';
import { GrandprixController } from './grandprix.controller';

@Module({
  providers: [GrandprixService],
  controllers: [GrandprixController]
})
export class GrandprixModule {}
