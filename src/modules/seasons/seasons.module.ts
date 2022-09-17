import { Module } from '@nestjs/common';
import { SeasonsController } from './seasons.controller';
import { SeasonsService } from './seasons.service';
import { DriversModule } from './drivers/drivers.module';
import { TeamsModule } from './teams/teams.module';
import { GrandprixModule } from './grandprix/grandprix.module';

@Module({
  providers: [SeasonsService],
  controllers: [SeasonsController],
  imports: [DriversModule, TeamsModule, GrandprixModule],
})
export class SeasonsModule {}
