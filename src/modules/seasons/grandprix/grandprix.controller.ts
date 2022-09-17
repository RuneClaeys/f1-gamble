import { Controller, Get, Param } from '@nestjs/common';
import { GrandprixService } from './grandprix.service';

@Controller('seasons/:seasonId/grandprix')
export class GrandprixController {
  constructor(private grandprixService: GrandprixService) {}

  @Get()
  async getAllGrandPrix(@Param('seasonId') seasonId: string) {
    return this.grandprixService.getAllGrandPrix(seasonId);
  }

  @Get(':grandPrixId')
  async getGrandPrix(@Param('seasonId') seasonId: string, @Param('grandPrixId') grandPrixId: string) {
    return this.grandprixService.getGrandPrix(seasonId, grandPrixId);
  }
}
